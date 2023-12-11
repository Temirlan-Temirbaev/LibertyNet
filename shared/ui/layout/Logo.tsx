import { HTMLAttributes } from "react";

export const Logo = ({...props} : HTMLAttributes<HTMLParagraphElement>) => {
  return <h1 {...props} className={`font-primary text-gray60 text-4xl font-extrabold ${props.className}`}>LibertyNet</h1>
}