import { useState } from "react";
import { useRouter } from "next/router";

import { Logo } from "../Logo";
import { Search } from "../../../../widgets/search/search";
import { BurgerButton } from "../menu/BurgerButton";
import { Menu } from "../menu/Menu";

export const Header = () => {

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return <>
    <header className={"w-full h-[70px] px-4 flex flex-row items-center justify-between xl:px-8"}>
      <Logo onClick={() => router.push("/")} className={"text-2x§ xl xl:text-4xl cursor-pointer"} />
      <div className={"flex items-center gap-x-5"}>
        <div className={"hidden lg:flex w-[400px] relative"}>
          <Search
            value={search}
            setValue={setSearch}
          />
        </div>
        <BurgerButton
          firstLineStyles={{ className: isOpen ? "transform -rotate-45 mt-[9px] translate-x-4.75 translate-y-3.75" : "" }}
          secondLineStyles={{ className: isOpen ? "opacity-0" : "" }}
          thirdLineStyles={{ className: isOpen ? "transform rotate-45 translate-x-0 -translate-y-1.5" : "" }}
          isOpen={isOpen}
          setIsOpen={setIsOpen} />
      </div>
    </header>
    <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
  </>;
};