import {PropsWithChildren, createContext} from "react";
import {SmartContract, useContract} from "@thirdweb-dev/react";
import {UserAbi} from "../shared/abi/userAbi";
import {BaseContract} from "ethers";
import { CONTRACT_ADDRESSES } from "../shared/constants/contractAddresses";
import { PostAbi } from "../shared/abi/postAbi";
import { DonateAbi } from "../shared/abi/donateAbi"
 
interface IContractContext {
  userContract : SmartContract<BaseContract> | undefined,
  postContract : SmartContract<BaseContract> | undefined,
  donateContract : SmartContract<BaseContract> | undefined,
}

export const ContractContext = createContext<IContractContext>({
  userContract : undefined,
  postContract : undefined,
  donateContract : undefined,
})

export const ContractProvider = ({children} : PropsWithChildren) => {

  const userContract = useContract(CONTRACT_ADDRESSES.user, UserAbi)
  const postContract = useContract(CONTRACT_ADDRESSES.post, PostAbi)
  const donateContract = useContract(CONTRACT_ADDRESSES.donate, DonateAbi);

  return <ContractContext.Provider value={{
    userContract : userContract.contract,
    postContract : postContract.contract,
    donateContract : donateContract.contract,
  }}>
    {children}
  </ContractContext.Provider>
}