"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/product-list";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const {
    name,
    price,
    discountPercentage,
    description,
    restaurant: {
      name: restaurantName,
      imageUrl: restaurantImageUrl,
      deliveryFee,
      deliveryTimeMinutes,
    },
  } = product;

  const restaurantDeliveryFee = Number(deliveryFee);

  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantityCLick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () => {
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[0.325rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={restaurantImageUrl}
            alt={restaurantName}
            fill
            sizes="100%"
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">{restaurantName}</span>
      </div>
      {/* NOME DO PRODUTO */}
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{name}</h1>
      {/* PREÇO DO PRODUTO E QUANTIDADE */}
      <div className="flex justify-between px-5">
        {/* PREÇO COM DESCONTO */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice({ product }))}
            </h2>
            {discountPercentage > 0 && <DiscountBadge product={product} />}
          </div>
          {/* PREÇO ORIGINAL */}
          {discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">{`De: ${formatCurrency(Number(price))}`}</p>
          )}
        </div>

        {/* QUANTIDADE */}
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantityCLick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      {/* DADOS DA ENTREGA */}

      <div className="px-5">
        <Card className="mt-6 flex justify-around py-3">
          {/* CUSTO */}
          <div className={"flex flex-col items-center"}>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>
            {restaurantDeliveryFee > 0 ? (
              <p className="text-sm font-semibold">
                {formatCurrency(restaurantDeliveryFee)}
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

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Adicione mais itens</h3>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="mt-6 px-5">
        <Button className="w-full">Adicionar Sacola</Button>
      </div>
    </div>
  );
};

export default ProductDetails;
