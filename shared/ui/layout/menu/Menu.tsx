import {UIModal} from "../../UI-Modal";
import {SIDEBAR_ROUTES} from "../../../constants/sidebarRoutes";
import {Route} from "./Route";
import {ConnectWallet} from "@thirdweb-dev/react";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const Menu = ({isOpen, setIsOpen}: MenuProps) => {

  return isOpen && <UIModal isOpen={isOpen} setIsOpen={setIsOpen}>
    <div
      className={`w-[320px] 
      h-full absolute flex 
      flex-col justify-center 
      items-center
      -right-full
      bg-[#121212]
      z-[3]
      px-8
      ease-in
      transition-all
      delay-200
      gap-y-[30px]
      ${isOpen ? "right-0" : "-right-full"}
      top-0`}
      onClick={event => event.stopPropagation()}>
      {SIDEBAR_ROUTES.map((route) => {
        return <Route route={route} key={`${route.label}-${route.path}`}/>;
      })}
      <ConnectWallet className={"!flex !lg:hidden !w-full !h-[50px]"}/>
    </div>
  </UIModal>;
};