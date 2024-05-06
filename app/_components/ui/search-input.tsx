import { Input } from "../input";
import { Button } from "./button";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <div className="flex gap-4">
      <Input
        type="text"
        placeholder="Buscar restaurantes"
        className="border-none"
      />
      <Button size="icon" className="h-10 w-10">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default SearchInput;
