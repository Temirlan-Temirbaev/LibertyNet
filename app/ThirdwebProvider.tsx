import React from "react";
import { Goerli } from "@thirdweb-dev/chains";
import { ThirdwebProvider as ThirdProvider, embeddedWallet, metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES } from "../shared/constants/contractAddresses";

function ThirdwebProvider({ children }: React.PropsWithChildren) {


  return (
    <ThirdProvider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedChains={[Goerli]}
      activeChain={Goerli}
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: CONTRACT_ADDRESSES.smartWallet,
          gasless: true,
        }),
        metamaskWallet(),
      ]}
    >
      {children}
    </ThirdProvider>
  );
}

export default ThirdwebProvider;
