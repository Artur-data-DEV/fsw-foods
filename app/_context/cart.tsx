"use client";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}
interface ICartContext {
  products: CartProduct[];
  //eslint-disable-next-line no-unused-vars
  addProductToCart: (product: Product, quantity: number) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const addProductToCart = (product: Product, quantity: number) => {
    const isProductAlreadyOnCart = products.some((p) => p.id === product.id);
    if (isProductAlreadyOnCart) {
      return setProducts((prevState) =>
        prevState.map((p) => {
          if (p.id === product.id) {
            return { ...p, quantity: p.quantity + quantity };
          }
          return p;
        }),
      );
    }
    setProducts((prevState) => [...prevState, { ...product, quantity }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};
