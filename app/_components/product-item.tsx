import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const {
    name,
    imageUrl,
    discountPercentage,
    price,
    restaurant: { name: restaurantName },
  } = product;

  const totalPrice = calculateProductTotalPrice({ product });

  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        {discountPercentage !== 0 && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDownIcon size={12} />
            <span className="text-xs font-semibold">{`${discountPercentage}%`}</span>
          </div>
        )}
      </div>
      <div>
        <h2 className="truncate text-sm">{name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">{formatCurrency(totalPrice)}</h3>
          {discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(price))}
            </span>
          )}
        </div>
        <span className="block text-xs text-muted-foreground">
          {restaurantName}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
