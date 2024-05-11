import Image from "next/image";
import { CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const { name, imageUrl, price, discountPercentage, quantity } = cartProduct;

  return (
    <div className="flex items-center justify-between">
      {/* imagem e info */}
      <div className="flex w-full items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-xs">{name}</h3>
          <h4 className="text-sm font-semibold">
            {formatCurrency(
              calculateProductTotalPrice({ product: cartProduct }),
            )}
          </h4>
          {discountPercentage > 0 && (
            <span className="text-xs text-gray-500 line-through">
              {formatCurrency(price)}
            </span>
          )}
        </div>
        {/* quantidade */}
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 border border-solid border-muted-foreground"
          >
            <ChevronLeftIcon size={18} />
          </Button>
          <span className="text-sm">{quantity}</span>
          <Button size="icon" className="h-8 w-8">
            <ChevronRightIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
