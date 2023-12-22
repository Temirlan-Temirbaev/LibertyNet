import {ChangeEvent, useContext, useState} from "react";
import {UIModal} from "../../shared/ui/UI-Modal";
import {UIInput} from "../../shared/ui/UI-Input";
import {UIButton} from "../../shared/ui/UI-Button";
import {ContractContext} from "../../app/ContractProvider";
import {useContractWrite} from "@thirdweb-dev/react";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ethers} from "ethers";

interface DonateModalProps {
  receiverAddress: string;
  isOpen: boolean,
  setIsOpen: (val: boolean) => void,
}

export const DonateModal = ({receiverAddress, isOpen, setIsOpen}: DonateModalProps) => {

  const [amount, setAmount] = useState<number>(0);

  const {donateContract} = useContext(ContractContext)

  const {mutateAsync} = useContractWrite(donateContract, "makeDonation")

  const {mutateAsync: donate} = useMutation({
    mutationKey: ["donate"],
    mutationFn: () => {
      return mutateAsync({
        args: [receiverAddress], overrides: {
          value: ethers.utils.parseEther(String(amount))
        }
      })
    },
    onError: () => toast.error("Something went wrong"),
    onSuccess: () => {
      setIsOpen(false);
      toast.success(`You have successfully donated to ${receiverAddress}`)
    }
  })

  return isOpen && <UIModal isOpen={isOpen} setIsOpen={setIsOpen}>
    <div
      className={"w-[300px] flex flex-col items-center p-5 gap-y-5 blur-btn border-[1px] bg-[#888] bg-opacity-30 rounded-lg"}
      onClick={e => e.stopPropagation()}>
      <p className={"font-primary text-xl text-white"}>Donate (ETH)</p>
      <UIInput
        className={"rounded-lg blur-btn bg-opacity-10 bg-white border-none outline-none text-white"}
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))} type={"number"}/>
      <UIButton
        onClick={() => donate()}
        disabled={amount <= 0}
        className={`${amount <= 0 ? "cursor-not-allowed " : "cursor-pointer"} bg-bluePrimary blur-btn w-[200px] h-[40px] rounded-lg`}>
        <p className={"font-primary text-white"}>Submit</p>
      </UIButton>
    </div>
  </UIModal>
}