import WithLayout from "../../shared/ui/layout/WithLayout";
import { ProfileData } from "../../widgets/profile/ProfileData";
import { useQuery } from "@tanstack/react-query";
import { getByAddress } from "../../shared/api/post/getByAddress";
import { useRouter } from "next/router";
import { UILoader } from "../../shared/ui/UI-Loader";
import { PostCard } from "../../widgets/post/postCard";

const Profile = () => {

  const router = useRouter();

  const address = String(router.query.address)

  const {data : posts, isLoading} = useQuery({
    queryKey : ["getPostsByAddress", address],
    queryFn : () => getByAddress(address),
  })

  return <div className={"flex flex-col items-center gap-y-5 md:flex-row flex-wrap gap-x-10"}>
    <ProfileData />
    <div>
      <h1 className={"font-primary text-3xl text-white mb-5"}>Posts</h1>
      <div className={"flex flex-col gap-y-[30px]"}>
      {posts?.length === 0 && !isLoading && <h1 className={"text-white"}>No results</h1>}
      {isLoading && <UILoader visible={true} />}
      {posts?.length !== 0 && posts?.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  </div>;
};

export default WithLayout(Profile);
