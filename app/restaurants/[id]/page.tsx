import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "../../_components/cart-banner";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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

  if (!restaurant) {
    return notFound();
  }

  const {
    imageUrl,
    name,
    categories: restaurantCategory,
    products: restaurantProducts,
  } = restaurant;

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <div className="relative z-50 mb-12 mt-[-1.5rem] h-16 w-full items-center rounded-tl-3xl rounded-tr-3xl border-t border-solid border-muted bg-white px-6 pt-5  ">
        {/* titulo */}
        <div className="flex items-center justify-between gap-2">
          <div className="relative h-16 w-16">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-semibold">{name}</h1>
          <div className="flex items-center gap-[0.375rem] rounded-full bg-foreground px-2 py-[2px] text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-500" />
            <span className="text-xs font-semibold">5.0</span>
          </div>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="hide-scrollbar mt-3 flex gap-4 overflow-x-scroll px-5">
        {restaurantCategory.map(({ name, id }) => (
          <div
            key={id}
            className=" min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
          >
            <a
              className="block py-2 text-xs text-muted-foreground"
              href={`#${name}`}
              key={id}
            >
              {name}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 px-3 pb-24">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurantProducts} />
        {restaurantCategory.map(({ id, name, products }) => (
          <div key={id} id={name} className="mt-6 space-y-5 ">
            <h2 className="px-5 font-semibold">{name}</h2>
            <ProductList products={products} />
          </div>
        ))}
      </div>
      <CartBanner />
    </div>
  );
};

export default RestaurantPage;
