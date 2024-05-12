import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
      category: true, // Incluindo a categoria do produto
    },
  });

  if (!product) {
    return notFound();
  }

  const {
    category: { name: categoryName },
    restaurant: { id: restaurantId },
  } = product;

  let complementaryProducts;

  if (
    ["Hambúrgueres", "Pizzas", "Japonesa", "Brasileira"].includes(categoryName)
  ) {
    // Se for uma categoria primária, buscar sucos e sobremesas
    complementaryProducts = await db.product.findMany({
      where: {
        OR: [
          { category: { name: "Sucos" } },
          { category: { name: "Sobremesas" } },
        ],
        restaurantId: restaurantId,
      },
      include: {
        restaurant: true,
      },
    });
  } else {
    // Se não for uma categoria secundaria, buscar hamburguers, pizzas, japonesa ou brasileira
    complementaryProducts = await db.product.findMany({
      where: {
        OR: [
          { category: { name: "Hambúrgueres" } },
          { category: { name: "Pizzas" } },
          { category: { name: "Japonesa" } },
          { category: { name: "Brasileira" } },
        ],
        restaurantId: restaurantId,
      },
      include: {
        restaurant: true,
      },
    });
  }

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails
        product={product}
        complementaryProducts={complementaryProducts}
      />
    </div>
  );
};

export default ProductPage;
