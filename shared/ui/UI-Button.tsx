import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

type UIButtonProps = {
  text? : string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & PropsWithChildren

export const UIButton = ({ text, className, children, ...props }: UIButtonProps) => {
  return <button
    className={`w-full h-[40px] rounded-md border-default px-1.5 ${className}`}
    {...props}
  >
    {text && text}
    {children}
  </button>;
};