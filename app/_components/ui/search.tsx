"use client";
import { Input } from "../input";
import { Button } from "./button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex gap-2 ">
      <Input
        type="text"
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" className="h-10 w-10" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
