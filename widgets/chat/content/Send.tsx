import { UIInput } from "../../../shared/ui/UI-Input";
import { ChangeEvent, useState } from "react";
import { UIButton } from "../../../shared/ui/UI-Button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { postMessage } from "../../../shared/api/conversation/postMessage";

export const Send = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: () => {
      setContent("")
      return postMessage(content, Number(router.query.conversationId));
    },
    onError: () => toast.error("Something went wrong"),
  });

  return <div className={"flex flex-col sm:flex-row gap-x-5 gap-y-5"}>
    <UIInput
      className={"min-w-[70%] blur-btn bg-gray10 text-white"}
      value={content} onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)} />
    <UIButton
      disabled={content.length === 0}
      onClick={() => mutate()}
      className={` bg-bluePrimary w-[150px] h-[40px] rounded-lg ${content.length === 0 ? "cursor-not-allowed blur-btn" : "blur-btn"}`}>
      <p className={"text-white font-2xl font-medium"}>Send</p>
    </UIButton>
  </div>;
};