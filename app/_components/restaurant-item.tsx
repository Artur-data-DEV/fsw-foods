import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  const { name, imageUrl, deliveryFee, deliveryTimeMinutes } = restaurant;
  return (
    <div className="min-w-[266px] max-w-[266px]">
      <div className="relative h-[136px] w-full">
        <Image
          src={imageUrl}
          fill
          className="rounded-lg object-cover"
          alt={name}
        />
        {
          <div className="absolute left-0 top-0 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{"5.0"}</span>
          </div>
        }
        <Button
          size={"icon"}
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700"
        >
          <HeartIcon className="fill-white" size={16} />
        </Button>
      </div>
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
        <div className="flex gap-3">
          <div className="flex gap-1">
            <BikeIcon className={"text-primary"} size={14} />
            <span className="text-xs text-muted-foreground">
              {Number(deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(deliveryFee))}
            </span>
          </div>
          <div className="flex gap-1">
            <TimerIcon className={"text-primary"} size={14} />
            <span className="text-xs text-muted-foreground">
              {`${deliveryTimeMinutes} min`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
