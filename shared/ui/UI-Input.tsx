import { HTMLProps } from "react";
import { FieldError } from "react-hook-form";
import { UIErrorText } from "./UI-Error-Text";

type UIInputProps = {
  additional?: any,
  error?: string | undefined | FieldError
} & HTMLProps<HTMLInputElement>

export const  UIInput = ({ className, error, additional, ...props }: UIInputProps) => {
  return <><input
    {...props}
    {...additional}
    className={`w-full h-[40px] border-default rounded-sm px-1.5 ${className}`}
  />
    {error && <UIErrorText error={String(error)}/>}
  </>;
};