import Image from "next/image";
import { useContext } from "react";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const { id, name, imageUrl, price, discountPercentage, quantity } =
    cartProduct;
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(id);
  };

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(id);
  };

  const handleRemoveClick = () => {
    removeProductFromCart(id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Imagem */}
        <div className="relative h-20 w-20">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* Informações */}
        <div className="flex-col justify-between">
          <h3 className="text-xs">{name}</h3>
          <div className="flex space-x-1 text-center">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice({ product: cartProduct }) * quantity,
              )}
            </h4>
            {discountPercentage > 0 && (
              <span className="text-xs text-gray-500 line-through ">
                {formatCurrency(price * quantity)}
              </span>
            )}
          </div>
          {/* Botões de adicionar e remover */}
          <div className="mt-2 flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="block w-4 text-xs">{quantity}</span>
            <Button
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Botão de remover */}
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 border border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
