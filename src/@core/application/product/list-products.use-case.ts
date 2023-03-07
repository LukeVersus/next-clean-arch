import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";
// ProductGateway === ProductRepository
export class ListProductsUseCase {
    constructor(private productGateway: ProductGateway){}

    async executeList(): Promise<Product[]> {
        return await this.productGateway.findAll();
    }
    
}