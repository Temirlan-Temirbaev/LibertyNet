import {PropsWithChildren, createContext} from "react";
import {SmartContract, useContract} from "@thirdweb-dev/react";
import {UserAbi} from "../shared/abi/userAbi";
import {BaseContract} from "ethers";
import { CONTRACT_ADDRESSES } from "../shared/constants/contractAddresses";

interface IContractContext {
  userContract : SmartContract<BaseContract> | undefined
}

export const ContractContext = createContext<IContractContext>({
  userContract : undefined,
})

export const ContractProvider = ({children} : PropsWithChildren) => {

  const userContract = useContract(CONTRACT_ADDRESSES.user, UserAbi)

  return <ContractContext.Provider value={{
    userContract : userContract.contract,
  }}>
    {children}
  </ContractContext.Provider>
}