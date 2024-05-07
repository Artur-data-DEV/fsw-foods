import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}
const CategoryItem = ({ category }: CategoryItemProps) => {
  const { name, imageUrl } = category;
  return (
    <div className="flex min-w-[160px] items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md">
      <Image src={imageUrl} alt={name} height={30} width={30} />
      <p className="block text-sm font-semibold">{name}</p>
    </div>
  );
};

export default CategoryItem;
