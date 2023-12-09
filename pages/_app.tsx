import type { AppProps } from "next/app";
import { ThirdwebProvider, embeddedWallet, metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../app/AuthProvider";
import { ContractProvider } from "../app/ContractProvider";
import { ToastContainer } from "react-toastify";
import { Goerli } from "@thirdweb-dev/chains";
import QueryProvider from "../app/QueryProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedChains={[Goerli]}
      activeChain={Goerli}
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress : "0x7396c203d22B065b121807B268B4A8A9CC39f97f",
          gasless: true,
        }),
        metamaskWallet(),
      ]}
    >
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
