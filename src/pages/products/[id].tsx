import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.provider';
import { GetProductUseCase } from '../../@core/application/product/get-product.use-case';
import { Registry, container } from '../../@core/infra/container-registry';
import { Product, ProductProps } from '../../@core/domain/entities/product';

type ProductDetailPageProps = {
    product: ProductProps
}

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({product}) => {
    const productEntity = new Product({...product})
    const cartContext = useContext(CartContext);
    return (
        <div>
            <h3>{productEntity.name}</h3>
            <div>
                <h5>Descrição: </h5> {productEntity.description}
            </div> 
            <label>Preço: </label> {productEntity.price}
            <button onClick={() => cartContext.addProduct(productEntity)}>Adicionar ao Carrinho</button>
        </div>
    );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params || {};
    const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
    const product = await useCase.executeGet(+id!);
    return {
        props: {
            product: product.toJSON()
        }
    }
} 