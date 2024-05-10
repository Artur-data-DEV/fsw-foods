"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
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
    restaurant: { name: restaurantName, imageUrl: restaurantImageUrl },
  } = product;

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
        <div className="relative h-10 w-10">
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
