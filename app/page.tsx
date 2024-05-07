import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import SearchInput from "./_components/ui/search-input";

const Home = () => {
  const cn = "px-5 pt-6";
  return (
    <>
      <Header />
      <div className={cn}>
        <SearchInput onSearch={() => {}} />
      </div>

      <div className={cn}>
        <CategoryList />
      </div>

      <div className={cn}>
        <Image
          src="/Banner_Pizza.png"
          alt="Ate 30% de desconto em pizzas!"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
          priority={true}
          layout="responsive"
        />
      </div>
    </>
  );
};
export default Home;
