import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import SearchInput from "./_components/ui/search-input";
import ProductList from "./_components/product-list";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const Home = async () => {
  const productsCount = await db.product.count();
  const skip = Math.floor(Math.random() * productsCount);
  // poderia implementar uma logica para exibir restaurantes que pagam $$ a mais para aparecer na tela principal do app
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
    <>
      <Header />
      <div className={"px-5 pt-6"}>
        <SearchInput onSearch={() => {}} />
      </div>

      <div className={"px-5 pt-6"}>
        <CategoryList />
      </div>

      <div className={"px-5 pt-6"}>
        <PromoBanner
          src="/Banner_Pizza.png"
          alt="Ate 30% de desconto em pizzas!"
        />
      </div>
      <div className={"space-y-4 pt-6"}>
        <div className={"flex items-center justify-between px-5"}>
          <h2 className={"font-semibold"}>Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner
          src={"/PromoBanner01.png"}
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
    </>
  );
};
export default Home;
