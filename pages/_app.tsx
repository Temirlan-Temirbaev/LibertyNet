import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "../app/AuthProvider";
import { ContractProvider } from "../app/ContractProvider";
import QueryProvider from "../app/QueryProvider";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import ThirdwebProvider from "../app/ThirdwebProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider>
      <QueryProvider>
        <ContractProvider>
          <AuthProvider>
            <ToastContainer />
            <div className={"w-full h-screen bg-[rgb(22,22,22)] bg-none sm:bg-[url('/images/bg.png')]"} style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}>
              <Component {...pageProps} />
            </div>
          </AuthProvider>
        </ContractProvider>
      </QueryProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
