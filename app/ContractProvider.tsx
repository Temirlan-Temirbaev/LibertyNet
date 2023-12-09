import {PropsWithChildren, createContext} from "react";
import {SmartContract, useContract} from "@thirdweb-dev/react";
import {UserAbi} from "../shared/abi/userAbi";
import {BaseContract} from "ethers";

interface IContractContext {
  userContract : SmartContract<BaseContract> | undefined
}

export const ContractContext = createContext<IContractContext>({
  userContract : undefined,
})

export const ContractProvider = ({children} : PropsWithChildren) => {

  const userContract = useContract("0xacf216a2c2edf8d411b0d9e4bfc8102bcd45bc67", UserAbi)

  return <ContractContext.Provider value={{
    userContract : userContract.contract,
  }}>
    {children}
  </ContractContext.Provider>
}