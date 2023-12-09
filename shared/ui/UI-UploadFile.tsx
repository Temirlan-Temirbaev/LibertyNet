import {HTMLProps} from "react";


export const UIUploadFile = ({className, ...props} : HTMLProps<HTMLInputElement>) => {
  return <div className={"flex justify-center w-full"}>
    <input {...props} type={"file"} id={"uploadFile"} className={"hidden"} />
    <label
      htmlFor={"uploadFile"}
      className={`
      cursor-pointer
      w-full flex 
      justify-center 
      items-center 
      max-w-[368px] 
      rounded-sm 
      text-black45
      h-[140px] 
      bg-white ${className}`}>
      Upload file
    </label>
  </div>
}