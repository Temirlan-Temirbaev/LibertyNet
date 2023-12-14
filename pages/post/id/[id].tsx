import WithLayout from "../../../shared/ui/layout/WithLayout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getPostById } from "../../../shared/api/post/getPostById";
import { UILoader } from "../../../shared/ui/UI-Loader";
import { PostCard } from "../../../widgets/post/postCard";
import BackIcon from "../../../public/icons/back.svg";

const GetPostById = () => {

  const router = useRouter();
  const id = router.query.id;
  const { data, isLoading } = useQuery({
    queryKey: ["getPostById", id],
    queryFn: () => getPostById(Number(id)),
  });

  return (
    <div className={"flex w-full justify-center px-4"}>
      {isLoading && <UILoader visible={true} />}
      <div className={"flex flex-col gap-y-5 w-full xl:w-4/5"}>
        <BackIcon
          className={"w-[36px] h-[36px]"}
          onClick={() => router.back()} />
        {!data ? <UILoader visible={true} /> : <PostCard post={data} />}
      </div>
    </div>
  );
};

export default WithLayout(GetPostById);