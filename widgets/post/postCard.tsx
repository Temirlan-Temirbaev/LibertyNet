import { Post } from "../../interfaces/post";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { UserInfo } from "../../shared/ui/post/UserInfo";
import { CommentSection } from "../../shared/ui/post/CommentSection";
import UserIcon from "../../public/icons/user.svg";

interface PostCartProps {
  post: Post;
}

export const PostCard = ({ post }: PostCartProps) => {

  const isTooLargeText = post?.content.length >= 100;
  const router = useRouter();
  const firstComment = post.comments[0]

  return <div
    onClick={() => router.push(`post/id/${post.id}`)}
    className={"blur-btn cursor-pointer" +
      " flex flex-col px-4 hover:bg-gray20 " +
      "lg:px-10 gap-y-5 pt-3 pb-10 rounded-3xl transition-all delay-200 ease" +
      "min-h-[300px] w-full lg:w-3/5 xl:4/5"}>
    <UserInfo avatar={post.author.avatar} nickname={post.author.nickname} address={post.author.address} />
    <h1 className={"text-white break-all"}>{isTooLargeText ? `${post.content}...` : post.content}</h1>
    {
      post.mediaContentUrl !== "" ?
        <MediaRenderer
          src={post.mediaContentUrl}
          className={"max-w-[90%] max-h-[50vh]"} /> : null
    }
    <CommentSection postId={post.id} />
    {firstComment && <div className={"hidden rounded-2xl lg:flex gap-x-4 h-[60px] bg-black bg-opacity-20 items-center w-3/5 px-5 blur-btn"}>
      <div className={"w-[36px] h-[36px] flex justify-center items-center bg-gray20 blur-btn"}>
        <UserIcon className={"w-[24px] h-[24px]"} />
      </div>
      <p className={"text-white"}>{firstComment.content}</p>
    </div>}
  </div>;
};