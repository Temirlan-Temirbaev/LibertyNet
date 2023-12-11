import { ComponentType, FC } from "react";
import { Header } from "./header/Header";

const WithLayout = (Page: ComponentType) => {
  const withLayout: FC = pageProps => (
    <div className={"flex w-full h-screen"}>
      <div className={"flex flex-col w-full h-screen"}>
        <Header />
        <div className={"w-full h-full px-4 xl:px-8 py-4 overflow-auto"}>
          <Page {...pageProps} />
        </div>
      </div>
    </div>
  );

  return withLayout;
};

export default WithLayout;
