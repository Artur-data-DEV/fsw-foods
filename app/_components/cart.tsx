import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);

  return (
    <div className="flex h-full flex-col py-5">
      <div className="flex-auto space-y-4">
        {products.map((product) => {
          return <CartItem key={product.id} cartProduct={product} />;
        })}
      </div>
      {products.length > 0 && (
        <div className="mt-auto">
          <Card>
            <CardContent className="space-y-2 py-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-sm">{formatCurrency(subtotalPrice)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Descontos</span>
                <span>- {formatCurrency(totalDiscounts)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Entrega</span>
                <span>
                  {products[0]?.restaurant.deliveryFee === 0 ? (
                    <span className="font-semibold uppercase text-primary">
                      Grátis
                    </span>
                  ) : (
                    formatCurrency(products[0]?.restaurant.deliveryFee)
                  )}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="font-semibold">Total</span>
                <span>
                  {formatCurrency(
                    totalPrice + products[0]?.restaurant.deliveryFee,
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
