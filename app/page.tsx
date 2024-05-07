import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import SearchInput from "./_components/ui/search-input";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <SearchInput onSearch={() => {}} />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>
    </>
  );
};
export default Home;
