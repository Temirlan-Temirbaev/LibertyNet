import {HTMLAttributes, PropsWithChildren, useEffect} from "react";
import {gsap} from "gsap";

type UIModalProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
} & HTMLAttributes<HTMLDivElement> & PropsWithChildren

export const UIModal = ({isOpen, setIsOpen, children, ...props}: UIModalProps) => {

  useEffect(() => {
    gsap.to(".ui-modal", {
      duration: 0.2,
      ease: "Power3.easeInOut",
      background: isOpen ? "rgba(0,0,0, .5)" : "none",
      display: isOpen ? "flex" : "none",
    });
  }, [isOpen]);

  return <div
    {...props}
    onClick={() => setIsOpen(false)}
    className={`absolute right-0 top-0 flex justify-center items-center w-full h-screen z-[2] ui-modal ${props.className}`}>
    {children}
  </div>;
};