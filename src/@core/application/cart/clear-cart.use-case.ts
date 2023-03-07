import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";


export class ClearCartUseCase {
    constructor(private cartGateway: CartGateway) {}

    async execute(): Promise<Cart> {
        const cart = await this.cartGateway.get();
        cart.clear();
        this.cartGateway.save(cart);
        return cart;
    }
    
}