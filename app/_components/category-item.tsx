// CategoryItem.tsx
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const { id, name, imageUrl } = category;
  return (
    <div className="w-full rounded-lg bg-white shadow-md hover:shadow-lg">
      <Link href={`/categories/${id}/products`} passHref>
        <div className="flex transform items-center justify-around gap-1 rounded-lg p-2 hover:bg-gray-100">
          <div className="relative h-12 w-12 overflow-hidden">
            <Image src={imageUrl} alt={name} fill sizes="100%" />
          </div>
          <span className="text-sm font-semibold">{name}</span>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
