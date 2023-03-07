import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class GetProductUseCase {
    constructor(private productGate: ProductGateway){}

    async executeGet(id: number): Promise<Product> {
        return await this.productGate.findById(id);
    }

}