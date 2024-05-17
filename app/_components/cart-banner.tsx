"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { ShoppingBasketIcon } from "lucide-react";
import { useContext } from "react";

const CartBanner = () => {
  const { totalPrice, totalQuantity, isCartOpen, setIsCartOpen } =
    useContext(CartContext);
  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  if (totalQuantity === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full border-t border-solid border-muted bg-white p-5 pt-3">
      <div className="relative flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total (sem entrega)
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs text-muted-foreground">
              /{totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
            </span>
          </h3>
        </div>
        <div>
          <Button onClick={handleOpenCart}>Ver sacola</Button>
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetHeader>
              <SheetContent className="w-[90vw]">
                <SheetTitle className="flex items-center justify-between text-left">
                  Sacola
                  <ShoppingBasketIcon color={"#ff3865"} />
                </SheetTitle>
                <Cart />
              </SheetContent>
            </SheetHeader>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default CartBanner;
