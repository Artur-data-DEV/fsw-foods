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
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-center text-2xl font-bold capitalize">{name}</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categoryProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <CartBanner />
    </div>
  );
};

export default CategoriesPage;
