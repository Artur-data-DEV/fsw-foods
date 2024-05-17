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
  ShoppingBasketIcon,
  TimerIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useContext, useState } from "react";
import ProductList from "@/app/_components/product-list";
import { CartContext } from "@/app/_context/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import CartBanner from "@/app/restaurants/[id]/_components/cart-banner";
import { Separator } from "@/app/_components/ui/separator";

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
      id: restaurantId,
      name: restaurantName,
      imageUrl: restaurantImageUrl,
      deliveryFee: restaurantDeliveryFee,
      deliveryTimeMinutes: restaurantDeliveryTimeMinutes,
    },
  } = product;
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, quantity, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    console.log("Add to cart clicked...");
    const hasDifferentRestaurantProduct = products.some((cartProduct) => {
      return cartProduct.restaurantId !== product.restaurantId;
    });
    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }
    addToCart({
      emptyCart: false,
    });
  };

  const handleIncreaseQuantityCLick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () => {
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  };
  const router = useRouter();
  console.log("Rendering product details...");
  return (
    <>
      <div className="relative mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl border-t border-solid border-muted bg-white p-2 pb-24 shadow-md ">
        {/* RESTAURANTE */}
        <div className=" items-center gap-[0.325rem] p-4 ">
          <div className="relative h-14 w-14 justify-around space-x-11">
            <Image
              src={restaurantImageUrl}
              alt={restaurantName}
              fill
              sizes="100%"
              className="rounded-full object-cover hover:cursor-pointer"
              onClick={() => router.push(`/restaurants/${restaurantId}`)}
            />
            <Button
              onClick={() => router.push(`/restaurants/${restaurantId}`)}
              className="bg-transparent text-gray-500 hover:bg-transparent"
            >
              <div>
                <h1 className="text-left text-lg font-semibold text-gray-900">
                  {restaurantName}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  {/* Ícone da bicicleta */}
                  <div className="flex items-center gap-1">
                    <BikeIcon size={16} className="text-primary" />
                    <p
                      className={`text-sm font-semibold ${restaurantDeliveryFee === 0 ? "uppercase text-green-500" : ""}`}
                    >
                      {restaurantDeliveryFee > 0
                        ? formatCurrency(restaurantDeliveryFee)
                        : " Grátis"}
                    </p>
                  </div>
                  {/* Ícone do temporizador */}
                  <div className="flex items-center gap-1">
                    <TimerIcon size={16} className="text-primary" />
                    <p className="text-sm font-semibold">
                      {restaurantDeliveryTimeMinutes + "min"}
                    </p>
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
        {/* NOME DO PRODUTO */}
        <h1 className="mb-2 mt-2 px-5 text-xl font-semibold">{name}</h1>
        {/* PREÇO DO PRODUTO E QUANTIDADE */}
        <div className="flex justify-between px-5">
          {/* PREÇO COM DESCONTO */}
          <div>
            <div className="flex items-center gap-2 ">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice({ product }))}
              </h2>
              {discountPercentage > 0 && <DiscountBadge product={product} />}
            </div>
            {/* PREÇO ORIGINAL */}
            {discountPercentage > 0 && (
              <p className="text-sm text-muted-foreground">{`De: ${formatCurrency(price)}`}</p>
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
          <Separator className="mt-3" />
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-6 px-5">
          <Button className="w-full" onClick={handleAddToCartClick}>
            Adicionar à sacola
          </Button>
        </div>
        <div className="mt-2 space-y-3 pt-3">
          <h3 className="px-5 font-semibold">Adicione mais itens</h3>
          <ProductList products={complementaryProducts} />
        </div>
        <CartBanner restaurant={product.restaurant} />
      </div>

      {products.length > 0 && (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetHeader>
            <SheetContent className="w-[90vw] ">
              <SheetTitle className="flex items-center justify-between text-left">
                Sacola
                <ShoppingBasketIcon color={"#ff3865"} />
              </SheetTitle>
              <Cart />
            </SheetContent>
          </SheetHeader>
        </Sheet>
      )}

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent className="w-[80vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>Sua sacola não está vazia</AlertDialogTitle>
            <AlertDialogDescription>Limpar sacola?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Sim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
