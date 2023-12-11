import { UIButton } from "../../UI-Button";
import { HTMLAttributes } from "react";

interface BurgerButtonProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  firstLineStyles?: HTMLAttributes<HTMLDivElement>;
  secondLineStyles?: HTMLAttributes<HTMLDivElement>;
  thirdLineStyles?: HTMLAttributes<HTMLDivElement>;
}

export const BurgerButton = ({ isOpen, setIsOpen, firstLineStyles, secondLineStyles, thirdLineStyles }: BurgerButtonProps) => {

    const transitionStyles = "transition-all delay-300 ease-linear";


    return <UIButton
      className={"blur-btn w-[40px] h-[40px] flex flex-col items-center justify-center relative z-[4]"}
      onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`w-[18px] h-[1.5px] ${transitionStyles} bg-white ${firstLineStyles?.className}`}></div>
      <div
        className={`w-[18px] h-[1.5px] mt-[3px] ${transitionStyles} bg-white ${secondLineStyles?.className}`}></div>
      <div
        className={`w-[18px] h-[1.5px] mt-[3px] ${transitionStyles} bg-white ${thirdLineStyles?.className}`}></div>
    </UIButton>;
  }
;