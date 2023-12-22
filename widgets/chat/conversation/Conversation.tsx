import { Conversation as ConversationInterface } from "../../../interfaces/conversation";
import { useContext } from "react";
import { AuthContext } from "../../../app/AuthProvider";
import UserIcon from "../../../public/icons/user.svg";
import { useRouter } from "next/router";

interface ConversationProps {
  conversation: ConversationInterface;
}

export const Conversation = ({ conversation }: ConversationProps) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const onClickHandler = async () => {
    await router.push(`/chat?conversationId=${conversation.id}`);
    location.reload();
  };

  const participant = conversation.users.find(participant => participant !== user)
  return <div
    onClick={onClickHandler}
    className={"flex gap-x-2 items-center cursor-pointer border-b-[1px] py-2"}>
    <UserIcon className={"w-[36px] h-[36px] fill-white"} />
    <p className={"text-white text-xl"}>
      {participant?.nickname}
      ({" "}{participant?.address.slice(0, 5)}...)
    </p>
  </div>;
};