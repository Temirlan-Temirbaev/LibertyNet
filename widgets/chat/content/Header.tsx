import BackIcon from "../../../public/icons/back.svg";
import { useRouter } from "next/router";

interface HeaderProps {
  nickname: string;
}

export const Header = ({ nickname }: HeaderProps) => {
  const router = useRouter();
  return <div className={"flex gap-x-[10px] items-center h-[70px]"}>
    <BackIcon className={"w-[24px] h-[24px] cursor-pointer"} onClick={() => router.push("/chat")} />
    <p className={"font-primary text-white text-2xl"}>{nickname}</p>
  </div>;
};