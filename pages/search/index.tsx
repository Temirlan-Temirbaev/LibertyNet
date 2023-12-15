import WithLayout from "../../shared/ui/layout/WithLayout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "../../shared/api/post/searchPosts";
import { UILoader } from "../../shared/ui/UI-Loader";
import { PostCard } from "../../widgets/post/postCard";
import { UIButton } from "../../shared/ui/UI-Button";
import { useEffect } from "react";
import { Search } from "../../widgets/search/search";

interface SearchQuery {
  by: string;
  text: string;
}

const SearchPage = () => {

  const router = useRouter();

  const { by, text }: SearchQuery = router.query;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["searchPosts"],
    queryFn: () => {
      return searchPosts(by, text);
    },
  });

  const defaultBtnStyles = "text-white blur-btn text-sm w-[150px] h-[50px]"
  const onClickHandler = (by : string) => {
    router.push(`/search?by=${by}&text=${text}`)
  }

  useEffect(() => {
    refetch();
  }, [by, text]);

  return <div>
    <div className={"flex flex-col items-center gap-y-5"}>
      <div>
        <div className={"flex lg:hidden w-full mb-5"}>
          <Search />
        </div>
        <h1 className={"font-primary text-2xl font-black text-white mb-6"}>Results for: {text}</h1>
        <div className={"flex gap-x-5"}>
          <UIButton
            onClick={() => onClickHandler("content")}
            className={`${by === "content" ? "bg-bluePrimary" : ""} ${defaultBtnStyles}`}>
            By Content
          </UIButton>
          <UIButton
            onClick={() => onClickHandler("address")}
            className={`${by === "address" ? "bg-bluePrimary" : ""} ${defaultBtnStyles}`}>
            By Author Address
          </UIButton>
        </div>
      </div>
      <div className={"flex flex-col items-center gap-y-6"}>
        {data?.length === 0 && !isLoading && <h1 className={"text-white"}>No results</h1>}
        {isLoading && <UILoader visible={true} />}
        {data?.length !== 0 && data?.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  </div>;
};

export default WithLayout(SearchPage);