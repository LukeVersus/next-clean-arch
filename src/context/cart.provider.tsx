import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { Cart } from '../@core/domain/entities/cart';
import { Registry, container } from '../@core/infra/container-registry';
import { AddProductInCartUseCase } from '../@core/application/cart/add-product-in-cart.use-case';
import { Product } from '../@core/domain/entities/product';
import { RemoveProductFromCartUseCase } from '../@core/application/cart/remove-product-from-cart.use-case';
import { ClearCartUseCase } from '../@core/application/cart/clear-cart.use-case';
import { GetCartUseCase } from '../@core/application/cart/get-cart.use-case';

export type CartContextType = {
    cart: Cart;
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    clear: () => void;
    reload: () => void;
}

const defaultCartContext: CartContextType = {
    cart: new Cart({products: []}),
    addProduct: (product: Product) => {},
    removeProduct: (productId: number) => {},
    clear: () => {},
    reload: () => {},
}

export const CartContext = createContext(defaultCartContext);
const getCartUseCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);
const addProductUseCase = container.get<AddProductInCartUseCase>(Registry.AddProductInCartUseCase);
const removeProductFromCartUseCase = container.get<RemoveProductFromCartUseCase>(Registry.RemoveProductFromCartUseCase);
const clearCartUseCase = container.get<ClearCartUseCase>(Registry.ClearCartUseCase);

export const CartProvider = ({children}: PropsWithChildren) => {
    const [cart, setCart] = useState<Cart>(defaultCartContext.cart);

    const addProduct = useCallback(async (product: Product) => {
        const cart = await addProductUseCase.execute(product);
        setCart(cart);
    }, []);

    const removeProduct = useCallback(async (productId: number) => {
        const cart = await removeProductFromCartUseCase.execute(productId)
        setCart(cart);
    }, []);

    const clear = useCallback(async () => {
        const cart = await clearCartUseCase.execute();
        setCart(cart);
    }, []);

    const reload = useCallback(async () => {
        const cart = await getCartUseCase.execute();
        setCart(cart);
    }, [])

    useEffect(() => {
        reload();
    }, [reload])

    return (
        <CartContext.Provider
            value={{
                cart,
                addProduct,
                removeProduct,
                clear,
                reload
            }}
        >
            {children}
        </CartContext.Provider>
    )
}