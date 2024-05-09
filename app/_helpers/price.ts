import { Product } from "@prisma/client";

interface PriceCalculateItemProps {
  product: Product;
}

export const calculateProductTotalPrice = ({
  product,
}: PriceCalculateItemProps): number => {
  const { price, discountPercentage } = product;
  const discountedPrice =
    discountPercentage === 0 ? price : price * (1 - discountPercentage / 100);

  return discountedPrice;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};
