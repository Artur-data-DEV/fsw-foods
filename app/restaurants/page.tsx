"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { searchForRestaurant } from "./recommended/_actions/search";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          {`Resultados para "${searchFor}"`}
        </h2>
        <div className="grid grid-cols-2 flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

const SuspendedRestaurants = () => (
  <Suspense fallback="Carregando...">
    <Restaurants />
  </Suspense>
);

export default SuspendedRestaurants;
