import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../../../shared/api/conversation/getConversations";
import { Conversation } from "./Conversation";
import { useRouter } from "next/router";

export const ConversationsList = () => {

  const { data: conversations } = useQuery({
    queryKey: ["getConversations"],
    queryFn: () => getConversations(),
  });
  const router = useRouter();

  return <div
    className={`${router.query.conversationId ? "hidden" : ""} md:flex flex flex-col blur-btn max-h-[500px] overflow-y-auto w-full  md:max-w-[300px] p-5 bg-gray20 rounded-xl`}>
    <p className={"font-primary text-2xl text-white mb-3"}>Chats</p>
    <div className={"flex flex-col gap-y-5"}>
      {conversations?.map(conversation => <Conversation key={conversation.id} conversation={conversation} />)}
    </div>
  </div>;
};