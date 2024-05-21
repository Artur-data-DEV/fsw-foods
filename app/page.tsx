import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";
import Banner from "./_components/banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Search from "./_components/ui/search";
import CartBanner from "./_components/cart-banner";
import Carousel from "./_components/carousel";

const Home = async () => {
  const productsCount = await db.product.count();
  const skip = Math.floor(Math.random() * productsCount);
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    skip: skip,
    take: 15,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      discountPercentage: "desc",
    },
  });
  return (
    <div className="pb-14">
      <div className={"px-5 pt-6 "}>
        <Search />
      </div>

      <div className={"px-2 pt-2"}>
        <CategoryList />
      </div>

      <div>
        <Carousel
          images={[
            "/Banner_Hamburguer.png",
            "/Banner_Pizza.png",
            "/Banner_Japonesa.png",
          ]}
          links={[
            "/categories/b698e065-7628-44b4-a78d-0551ca4c7542/products",
            "/categories/956a46ca-d5ab-4ff1-b914-20e6875e6176/products",
            "/categories/66bf61ee-a7a6-48b0-afac-17ed152026e9/products",
          ]}
        />
      </div>
      <div className={"space-y-4 pt-6"}>
        <div className={"flex items-center justify-between px-5"}>
          <h2 className={"font-semibold"}>Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={"/products/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="pt-2">
        <Banner
          src={"/Banner_Hamburguer.png"}
          alt="A partir de R$17,90 em lanches"
        />
      </div>
      <div className={"space-y-4 py-6"}>
        <div className={"flex items-center justify-between px-5"}>
          <h2 className={"font-semibold"}>Restaurantes Recomendados</h2>
          <Link href={"/restaurants/recommended"}>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
      <CartBanner />
    </div>
  );
};

export default Home;
