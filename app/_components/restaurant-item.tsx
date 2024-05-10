import { Restaurant } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  const { id, deliveryFee, deliveryTimeMinutes, imageUrl, name } = restaurant;
  return (
    <Link href={`/restaurants/${id}`}>
      <div className="min-w-[266px] max-w-[266px] space-y-3">
        {/* IMAGEM */}
        <div className="relative h-[136px] w-full">
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
        {/* TEXTO */}
        <div>
          <h3 className="text-sm font-semibold">{name}</h3>
          {/* INFORMAÇÕES DA ENTREGA */}
          <div className="flex gap-3">
            {/* CUSTO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {deliveryFee === 0
                  ? "Entrega grátis"
                  : formatCurrency(deliveryFee)}
              </span>
            </div>
            {/* TEMPO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {`${deliveryTimeMinutes} min`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
