import { notFound } from "next/navigation";
import { db } from "../../_lib/prisma";
import ProductImage from "../_components/product-image";
import ProductDetails from "../_components/product-details";

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
    },
  });
  if (!product) {
    return notFound();
  }
  const {
    restaurant: { id: restaurantId },
  } = product;

  const complementaryProducts = await db.product.findMany({
    where: {
      // category: {
      //   name: "Sucos",
      // },
      // É POSSIVEL REALIZAR FILTROS COMO ESSE FILTRO DE APENAS SUCOS
      restaurantId: restaurantId,
    },
    include: {
      restaurant: true,
    },
  });

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
