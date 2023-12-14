import UserIcon from "../../../public/icons/user.svg";
import { useRouter } from "next/router";

interface CommentProps {
  author: string;
  content: string;
}

export const Comment = ({ author, content }: CommentProps) => {
  const router = useRouter();
  return <div
    onClick={e => e.stopPropagation()}
    className={`${router.pathname !== "/post/id/[id]" ? "hidden lg:flex" : "flex"} 
    rounded-2xl gap-x-4 py-2 min-h-[60px] bg-black bg-opacity-20 
    items-center w-full md:w-3/5 px-5 blur-btn`}>
    <div onClick={() => router.push(`/profile/${author}`)}
         className={"w-[36px] h-[36px] flex justify-center items-center bg-gray20 blur-btn"}>
      <UserIcon className={"w-[24px] h-[24px]"} />
    </div>
    <p className={"text-white break-all"}>{content}</p>
  </div>;
};