import CartBanner from "@/app/_components/cart-banner";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (!category) {
    return notFound();
  }
  const { name, products: categoryProducts } = category;
  return (
    <div>
      <div className={"px-5 py-6"}>
        <h2 className="mb-6 text-lg font-semibold">{name}</h2>
        <div className="grid grid-cols-3 flex-col gap-6 pb-14 ">
          {categoryProducts.map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                className="min-w-full"
              />
            );
          })}
        </div>
      </div>
      <CartBanner />
    </div>
  );
};

export default CategoriesPage;
