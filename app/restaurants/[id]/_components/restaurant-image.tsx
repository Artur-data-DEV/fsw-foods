"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "imageUrl" | "name">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const { imageUrl, name } = restaurant;
  const router = useRouter();
  const handleBackClick = () => router.push("/");
  return (
    <div className="relative h-[215px] w-full">
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="100%"
        className="object-cover"
      />
      <Button
        onClick={handleBackClick}
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-gray-700"
      >
        <HeartIcon size={24} className="fill-white pt-[2px]" />
      </Button>
    </div>
  );
};
export default RestaurantImage;
