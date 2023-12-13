import { NextPage } from "next";
import WithLayout from "../shared/ui/layout/WithLayout";
import { useState } from "react";
import { Post } from "../interfaces/post";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../shared/api/post/getPosts";
import { PostCard } from "../widgets/post/postCard";
import InfiniteScroll from "react-infinite-scroller";
import { ColorRing } from "react-loader-spinner";

const Home: NextPage = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const nextHandler = async () => {
    await refetch();
    const newDataLength = data?.length - page * 9;
    if (newDataLength < 9) setHasMore(false);
    setPage(page + 1);
  };

  const { data, refetch } = useQuery({
      queryKey: ["getPosts"],
      queryFn: async () => {
        const res = await getPosts(page);
        setPosts([...posts, ...res]);
        return res;
      },
    },
  );

  return (
    <div className={"flex flex-col items-center gap-y-5"}>
      <h1 className={"font-primary text-4xl font-black text-white"}>Recent Posts</h1>
      <InfiniteScroll
        pageStart={page}
        loadMore={nextHandler}
        hasMore={hasMore}
        loader={<ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />}
        useWindow={false}
      >
        <div className={"flex flex-col items-center gap-y-6"}>
          {posts.length !== 0 ? posts.map(post => <PostCard key={post.id} post={post} />) : <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default WithLayout(Home);
