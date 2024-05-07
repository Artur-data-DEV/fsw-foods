import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({
    include: {
      products: {
        take: 3,
        orderBy: {
          discountPercentage: "desc",
        },
      },
    },
  });
  return (
    <div className="hide-scrollbar flex gap-4 overflow-x-scroll px-5">
      {restaurants.map((restaurant) => {
        return <RestaurantItem key={restaurant.id} restaurant={restaurant} />;
      })}
    </div>
  );
};

export default RestaurantList;
