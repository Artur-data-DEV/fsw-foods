import { Product } from "@prisma/client";
import { Decimal } from "Decimal.js";

interface PriceCalculateItemProps {
  product: Product;
}

export const calculateProductTotalPrice = ({
  product,
}: PriceCalculateItemProps): number => {
  const { price, discountPercentage } = product;
  const numericPrice = parseFloat(price.toString());

  const discountedPrice =
    discountPercentage === 0
      ? numericPrice
      : numericPrice * (1 - discountPercentage / 100);

  return discountedPrice;
};

export const formatCurrency = (value: Decimal | string | number): string => {
  const numericValue =
    typeof value === "string" ? parseFloat(value) : Number(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(numericValue);
};
