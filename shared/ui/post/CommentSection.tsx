import { UIInput } from "../UI-Input";
import { ChangeEvent, useState } from "react";
import { UIButton } from "../UI-Button";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../api/comment/createComment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface CommentSectionProps {
  postId: number;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: () => {
      return createComment(postId, comment);
    },
    onError : () => {
      toast.error("Couldn't create comment'")
    },
    onSuccess : () => {
      toast.success("Comment successfully created")
    },
  });

  const handleButton = (e: any) => {
    e.stopPropagation();
    mutate();
  };

  return <div className={`${router.pathname !== "/post/id/[id]" ? "hidden lg:flex" : "flex flex-col gap-y-3 lg:flex-row"} gap-x-2 `}>
    <UIInput
      onClick={e => e.stopPropagation()}
      type={"text"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
      className={" blur-btn text-white w-3/5 !rounded-lg bg-gray20"} />
    <UIButton
      text={"Comment"}
      onClick={(e: any) => handleButton(e)}
      disabled={comment.length === 0}
      className={`blur-btn text-white font-bold hover:bg-opacity-70 
      !bg-bluePrimary w-1/5 
      ${comment.length === 0 ? "cursor-not-allowed" : ""}`}
    />
  </div>;
};