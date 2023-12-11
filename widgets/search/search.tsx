import { UIInput } from "../../shared/ui/UI-Input";
import { ChangeEvent } from "react";
import SearchIcon from "../../public/icons/search.svg";

interface SearchProps {
  value: string;
  setValue: (value: string) => void;
}

export const Search = ({ value, setValue }: SearchProps) => {
  return <div
    className={"flex justify-between items-center blur-btn gap-x-2 pr-3 rounded-xl bg-gray20 w-full"}>
    <UIInput
      id={"searchInput"}
      className={"font-light text-white rounded-none bg-transparent"}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
    <label htmlFor={"searchInput"} className={"cursor-text"}>
      <SearchIcon className={"w-[24px] h-[24px]"} />
    </label>
  </div>;
};