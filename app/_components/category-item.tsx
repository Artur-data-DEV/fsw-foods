import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}
const CategoryItem = ({ category }: CategoryItemProps) => {
  const { id, name, imageUrl } = category;
  return (
    <Link
      href={`/categories/${id}/products`}
      className="flex items-center justify-center gap-3 rounded-full bg-white py-3 shadow-md"
    >
      <Image src={imageUrl} alt={name} height={30} width={30} />
      <span className="text-sm font-semibold">{name}</span>
    </Link>
  );
};

export default CategoryItem;
