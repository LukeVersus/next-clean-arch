import { injectable } from "inversify"
import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";
import { Product } from "../../domain/entities/product";

@injectable()
export class CartLocalStorageGateway implements CartGateway {
    private readonly CART_KEY: string = "cart";

    get(): Cart {
        const products = JSON.parse(localStorage.getItem(this.CART_KEY) || "[]");
        return new Cart({ products: products.map(
            (p: any) => 
            new Product({
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
            })
        )});
    }

    save(cart: Cart): void {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart.products));
    }
}