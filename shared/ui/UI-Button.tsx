import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type UIButtonProps = {
  text : string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const UIButton = ({ text, className, ...props }: UIButtonProps) => {
  return <button
    className={`w-full h-[40px] bg-bluePrimary backdrop-blur-lg rounded-md border-default px-1.5 ${className}`}
    {...props}
  >{text}</button>;
};