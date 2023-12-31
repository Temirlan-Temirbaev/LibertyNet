import { Post } from "../../interfaces/post";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { UserInfo } from "../../shared/ui/post/UserInfo";
import { CommentSection } from "../../shared/ui/post/CommentSection";
import { Comment } from "../../shared/ui/post/Comment";

interface PostCartProps {
  post: Post;
}

export const PostCard = ({ post  }: PostCartProps) => {

  const isTooLargeText = post?.content.length >= 100;
  const router = useRouter();
  const firstComment = post.comments[0];

  const onPostClick = () => {
    if (router.pathname !== "/post/[id]") {
      router.push(`/post/id/${post.id}`)
    }
  }

  return <div
    onClick={onPostClick}
    className={"blur-btn cursor-pointer" +
        "min-w-[300px]" +
      " flex flex-col px-4 hover:bg-gray20 " +
      "lg:px-10 gap-y-5 pt-3 pb-10 rounded-3xl transition-all delay-200 ease" +
      `min-h-[300px] w-full ${router.pathname !== "/post/id/[id]" ? "lg:min-w-[60vw]" : "lg:w-11/12"}`}>
    <UserInfo avatar={post.author.avatar} nickname={post.author.nickname} address={post.author.address} />
    <h1 className={"text-white break-all"}>{isTooLargeText ? `${post.content}...` : post.content}</h1>
    {
      post.mediaContentUrl !== "" ?
        <MediaRenderer
          src={post.mediaContentUrl}
          className={"max-w-[90%] max-h-[50vh]"} /> : null
    }
    <CommentSection
      postId={post.id} />
    {router.pathname !== "/post/id/[id]" ? firstComment &&
      <Comment author={firstComment.author} content={firstComment.content} />
      :
      <div className={"flex flex-col gap-y-4"}>
        {post.comments.map((comment) => (
          <Comment author={comment.author} key={comment.id} content={comment.content} />
        ))}
      </div>
    }
  </div>;
};