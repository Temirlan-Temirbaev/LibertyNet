import { ColorRing } from "react-loader-spinner";

interface UILoaderProps {
  visible : boolean;
}

export const UILoader = ({visible} : UILoaderProps) => {
  return <ColorRing
    visible={visible}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperClass="blocks-wrapper"
    colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
  />
}