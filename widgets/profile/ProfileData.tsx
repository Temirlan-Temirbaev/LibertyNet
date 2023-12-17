import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "../../shared/api/profile/getProfile";
import { MediaRenderer, useContractWrite } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../app/AuthProvider";
import { UIButton } from "../../shared/ui/UI-Button";
import { ContractContext } from "../../app/ContractProvider";
import { banProfile } from "../../shared/api/profile/banProfile";
import { startConversationApi } from "../../shared/api/chat/startConversation";

export const ProfileData = () => {
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const { postContract } = useContext(ContractContext);
  const address = router.query.address;

  const { data: userData } = useQuery({
    queryKey: ["getProfileByAddress", address],
    queryFn: () => getProfile(String(address)),
  });

  const copyAddress = () => {
    navigator.clipboard.writeText(String(userData?.address));
    toast.success("Address copied");
  };

  const { mutate: banTx } = useContractWrite(postContract, "switchBanned");

  const { mutate: ban } = useMutation({
    mutationKey: ["ban"],
    mutationFn: () => {
      banTx({ args: [userData?.address] });
      return banProfile(String(userData?.address));
    },
    onSuccess: () => toast.success("User has been banned"),
    onError: () => toast.error("Something went wrong"),
  });

  const { mutate: startConversation } = useMutation({
    mutationKey: ["startConversation", address],
    mutationFn: () => startConversationApi(String(user?.address), String(userData?.address)),
    onError: () => toast.error("Something went wrong"),
    onSuccess: (id) => router.push(`/chat/${id}`),
  });

  return <div className={"w-[300px] p-5 blur-btn bg-gray20 rounded-[20px] flex flex-col"}>
    <MediaRenderer src={userData?.avatar} className={"w-[145px] h-[145px] rounded-xl"} />
    <p className={"text-center text-white font-bold text-2xl mb-3"}>{userData?.nickname}</p>
    <div onClick={copyAddress} className={"flex text-white overflow-hidden cursor-pointer mb-3"}>
      <p>Address : <span>{userData?.address}</span></p>
    </div>
    {user?.address !== userData?.address && <UIButton
      onClick={() => startConversation()}
      className={"blur-btn bg-bluePrimary rounded-lg mb-3"}>
      <p className={"text-white"}>Start conversation</p>
    </UIButton>
    }
    {(user?.role === "moderator" && user.address !== userData?.address) && (
      <UIButton onClick={() => ban()} className={"blur-btn bg-bluePrimary rounded-lg"}>
        <p className={"text-white"}>Ban User</p>
      </UIButton>
    )
    }
  </div>
    ;
};