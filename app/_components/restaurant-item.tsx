import { Restaurant } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  const { id, deliveryFee, deliveryTimeMinutes, imageUrl, name } = restaurant;
  return (
    <Link
      href={`/restaurants/${id}`}
      className={cn("min-w-[266px] max-w-[266px] ", className)}
    >
      <div className={"w-full cursor-pointer space-y-3"}>
        <div className="relative h-[136px] w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={name}
          />
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span>
                {deliveryFee === 0
                  ? "Entrega grátis"
                  : formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span>{`${deliveryTimeMinutes} min`}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
