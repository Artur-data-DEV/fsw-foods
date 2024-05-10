import { Restaurant } from "@prisma/client";
import { Card } from "./ui/card";
import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}
const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  const { deliveryFee, deliveryTimeMinutes } = restaurant;
  return (
    <div className="px-5">
      <Card className="mt-6 flex justify-around py-3">
        {/* CUSTO */}
        <div className={"flex flex-col items-center"}>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {deliveryFee > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(deliveryFee)}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>
        {/* TEMPO */}
        <div className={"flex flex-col items-center"}>
          <div className="text-muted-text-muted-foreground flex items-center gap-1">
            <span className="text-xs">Tempo</span>
            <TimerIcon size={14} />
          </div>
          {deliveryTimeMinutes ? (
            <p className="text-sm font-semibold">{`${deliveryTimeMinutes} min`}</p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DeliveryInfo;
