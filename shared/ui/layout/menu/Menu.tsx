import { useEffect } from "react";
import { gsap } from "gsap";
import { UIModal } from "../../UI-Modal";
import { SIDEBAR_ROUTES } from "../../../constants/sidebarRoutes";
import { Route } from "./Route";
import { ConnectWallet } from "@thirdweb-dev/react";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const Menu = ({ isOpen, setIsOpen }: MenuProps) => {

  useEffect(() => {
    gsap.to(".burger-menu", {
      duration: 0.2,
      ease: "power1.in",
      right: isOpen ? "0" : "-100vw",
    });
  }, [isOpen]);

  return <UIModal isOpen={isOpen} setIsOpen={setIsOpen}>
    <div
      className={`w-[320px] 
      h-full absolute flex 
      flex-col justify-center 
      items-center
      -right-full
      bg-[#121212]
      z-[3]
      burger-menu
      px-8
      gap-y-[30px]
      top-0`}
      onClick={event => event.stopPropagation()}>
      {SIDEBAR_ROUTES.map((route) => {
        return <Route route={route} key={`${route.label}-${route.path}`}/>;
      })}
      <ConnectWallet className={"!flex !lg:hidden !w-full !h-[50px]"} />
    </div>
  </UIModal>;
};