import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import SearchInput from "./_components/ui/search-input";
import ProductList from "./_components/product-list";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
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
    </>
  );
};
export default Home;
