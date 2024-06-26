import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <div>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="flex w-full flex-col gap-6">
          {products.map((products) => (
            <ProductItem
              key={products.id}
              product={products}
              className="min-w-full max-w-full "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProductsPage;
