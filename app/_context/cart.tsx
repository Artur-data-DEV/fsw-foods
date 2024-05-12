"use client";
/* eslint-disable no-unused-vars */
import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  addProductToCart: (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>,
    quantity: number,
  ) => void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductQuantity: (productId: string) => void;
  // eslint-disable-next-line no-unused-vars
  increaseProductQuantity: (productId: string) => void;
  // eslint-disable-next-line no-unused-vars
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice({ product }) * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscounts = subtotalPrice - totalPrice;

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prevState) =>
      prevState.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prevState) =>
      prevState.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((prevState) =>
      prevState.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const addProductToCart = (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>,
    quantity: number,
  ) => {
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    if (isProductAlreadyOnCart) {
      return setProducts((prevState) =>
        prevState.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        }),
      );
    }
    setProducts((prevState) => [
      ...prevState,
      { ...product, quantity: quantity },
    ]);
  };

  return (
    <CartContext.Provider
      value={{
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
