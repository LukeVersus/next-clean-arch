import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";


export class RemoveProductFromCartUseCase {
    constructor(private cartGateway: CartGateway) {}

    async execute(productId: number): Promise<Cart> {
        const cart = await this.cartGateway.get();
        cart.removeProduct(productId);
        this.cartGateway.save(cart);
        return cart;
    }
}