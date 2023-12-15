import { NextPage } from "next";
import WithLayout from "../shared/ui/layout/WithLayout";
import { useState } from "react";
import { Post } from "../interfaces/post";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../shared/api/post/getPosts";
import { PostCard } from "../widgets/post/postCard";
import InfiniteScroll from "react-infinite-scroller";
import { UILoader } from "../shared/ui/UI-Loader";
import { Search } from "../widgets/search/search";

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
      <div className={"flex lg:hidden w-full mb-5"}>
        <Search />
      </div>
      <h1 className={"font-primary text-4xl font-black text-white"}>Recent Posts</h1>
      <InfiniteScroll
        pageStart={page}
        loadMore={nextHandler}
        hasMore={hasMore}
        loader={<UILoader visible={true} />}
        useWindow={false}
      >
        <div className={"flex flex-col items-center gap-y-6"}>
          {posts.length !== 0 ? posts.map(post => <PostCard key={post.id} post={post} />) : <UILoader visible={true} />}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default WithLayout(Home);
