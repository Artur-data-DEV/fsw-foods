import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const fetchCategories = async () => {
  const categories = await db.category.findMany({});
  return categories;
};

const CategoryList = async () => {
  const categories = await fetchCategories();

  return (
    <div className="hide-scrollbar flex gap-5 overflow-x-auto p-5">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
