import { UIInput } from "../../shared/ui/UI-Input";
import { ChangeEvent, useState } from "react";
import SearchIcon from "../../public/icons/search.svg";
import { useRouter } from "next/router";


export const Search = () => {
  const router = useRouter();
  const {text, by} = router.query;
  const [value, setValue] = useState(text ? text : "")

  return <div
    className={"flex justify-between items-center blur-btn gap-x-2 pr-3 rounded-xl bg-gray20 w-full"}>
    <UIInput
      id={"searchInput"}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          router.push(`/search?by=${by ? by : "content"}&text=${value}`);
        }
      }}
      className={"font-light text-white rounded-none bg-transparent"}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
    <label htmlFor={"searchInput"} className={"cursor-text"}>
      <SearchIcon className={"w-[24px] h-[24px]"} />
    </label>
  </div>;
};