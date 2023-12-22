import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { useQuery } from "@tanstack/react-query";
import { getConversationsById } from "../../../shared/api/conversation/getConversationsById";
import { AuthContext } from "../../../app/AuthProvider";
import { Send } from "./Send";
import { Message as MessageInterface } from "../../../interfaces/message";
import { io } from "socket.io-client";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { Message } from "./Message";

export const Content = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [token] = useLocalStorage("liberty-net-token", "");

  const { data: conversation, refetch } = useQuery({
    queryKey: ["getConversationById"],
    queryFn: async () => {
      const conversation = await getConversationsById(Number(router.query.conversationId));
      setMessages([]);
      setMessages(prev => ([...prev, ...conversation.messages]));
      return conversation;
    },
  });

  const addToMessages = (message: MessageInterface) => {
    setMessages(prev => ([...prev, message]));
  };


  const socket = io(`http://178.18.242.163:3000/?conversationId=${String(router.query.conversationId)}`, {
    extraHeaders: {
      token: token,
    },
  });
  socket.on("connect", () => {
  });

  socket.on("disconnect", () => {
    console.warn("Disconnected from server");
  });

  socket.on("message", (data: MessageInterface) => {
    addToMessages(data);
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (router.query.conversationId) {
      refetch();
    }
    if (router.query.conversationId !== Number(socket._opts.query.split("=")[1])) {
      socket.disconnect();
    }
    if (conversation && router.query.conversationId != conversation?.id) {
      location.reload();
    }
    if (!conversation) refetch();
  }, [router.query.conversationId, conversation, socket]);

  if (!router.query.conversationId && !conversation) return null;

  const removeDuplicates = (arr: MessageInterface[]) => {
    const seenIds = new Set<number>();
    const sortedArr = arr.filter((message) => {
      if (!seenIds.has(message.id)) {
        seenIds.add(message.id);
        return true;
      }
      return false;
    });
    return sortedArr;
  };

  return <div className={`${router.query.conversationId ? "flex" : "hidden"}
   w-full md:max-w-[70%]
   h-[80vh]
   pt-2 pb-5 px-5
   flex-col 
   overflow-y-auto
   justify-between blur-btn rounded-xl border-[1px]`}>
    <div>
      <Header nickname={conversation?.users.find(participant => participant !== user)?.nickname} />
      <div className={"flex flex-col gap-y-5 mb-5"}>
        {removeDuplicates(messages).map((msg) => {
          return <Message message={msg} key={`${msg.id}-${Math.random()}`} />;
        })}
      </div>
    </div>
    <Send />
  </div>;
};