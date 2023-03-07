import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { ListProductsUseCase } from '../@core/application/product/list-products.use-case'
import { Registry, container } from '../@core/infra/container-registry'
import { ProductProps } from '../@core/domain/entities/product'

type HomeProps = {
  products: ProductProps[]
}

const Home: NextPage<HomeProps> = ({products}) => {
  return (
    <div>
      <h1>Ecommerce Full Cycle</h1>
      <ul>
        {products.map((product, key) =>(
          <li key={key}>
            <label>Nome: </label> {product.name} 
            |
            <Link href={`/products/${product.id}`} passHref>
              Ver
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const useCase = container.get<ListProductsUseCase>(Registry.ListProductsUseCase);
  const products = await useCase.executeList();

  return {
    props: {
      products: products.map((product) => product.toJSON())
    }
  }
};
