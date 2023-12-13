import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

interface UserInfoProps {
  avatar: string;
  nickname: string;
  address: string;
}

export const UserInfo = ({ avatar, nickname, address }: UserInfoProps) => {
  const router = useRouter();

  return <div className={"flex items-center gap-x-2 cursor-pointer"}
              onClick={() => router.push(`profile/${address}`)}>
    <MediaRenderer src={avatar} className={"max-w-[40px] max-h-[40px] rounded-[100%]"} />
    <p className={"text-white font-2xl font-bold font-primary"}>{nickname}</p>
  </div>;
};