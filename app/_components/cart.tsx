import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="flex justify-center py-5">
      <div className="w-full space-y-4 ">
        {products.map((product) => {
          return <CartItem key={product.id} cartProduct={product} />;
        })}
      </div>
    </div>
  );
};

export default Cart;
