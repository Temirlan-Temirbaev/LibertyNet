import {PropsWithChildren, createContext} from "react";
import {SmartContract, useContract} from "@thirdweb-dev/react";
import {UserAbi} from "../shared/abi/userAbi";
import {BaseContract} from "ethers";
import { CONTRACT_ADDRESSES } from "../shared/constants/contractAddresses";
import { PostAbi } from "../shared/abi/postAbi";

interface IContractContext {
  userContract : SmartContract<BaseContract> | undefined,
  postContract : SmartContract<BaseContract> | undefined
}

export const ContractContext = createContext<IContractContext>({
  userContract : undefined,
  postContract : undefined,
})

export const ContractProvider = ({children} : PropsWithChildren) => {

  const userContract = useContract(CONTRACT_ADDRESSES.user, UserAbi)
  const postContract = useContract(CONTRACT_ADDRESSES.post, PostAbi);

  return <ContractContext.Provider value={{
    userContract : userContract.contract,
    postContract : postContract.contract,
  }}>
    {children}
  </ContractContext.Provider>
}