import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ContractContext } from "../../app/ContractProvider";
import { MediaRenderer, useAddress, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import { UIInput } from "../../shared/ui/UI-Input";
import { UIUploadFile } from "../../shared/ui/UI-UploadFile";
import { UIButton } from "../../shared/ui/UI-Button";
import { useMutation } from "@tanstack/react-query";
import { Post } from "../../interfaces/post";
import { createPost } from "../../shared/api/post/createPost";
import { toast } from "react-toastify";

export const CreatePost = () => {

  const { postContract } = useContext(ContractContext);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [content, setContent] = useState("");
  const [url, setUrl] = useState<string[]>([]);
  const [isNft, setIsNft] = useState(false);

  // TODO: after we test the subscription contract, add logic for this;
  const postAsNft = useContractWrite(postContract, "mintPostNFT");

  const { mutateAsync: uploadImage } = useStorageUpload();

  useEffect(() => {
    onChangeFile();
  }, [file]);

  console.log(isNft);

  const onChangeFile = async () => {
    const uploadUrl = await uploadImage({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });

    setUrl(uploadUrl);
  };

  const {mutate} = useMutation({
    mutationKey : ["createPost"],
    mutationFn : async (data : Partial<Post>) => {
      if (isNft) {
        const post = await createPost(data);
        return postAsNft.mutate({args : [content, url[0], post.id]});
      } else {
        return createPost(data);
      }
    },
    onSuccess : () => {
      toast.success("Post created successfully")
    },
    onError : (e) => {
      toast.error(`Error creating post ${JSON.stringify(e)}`)
    },
  })

  return <div className={"flex flex-col items-center gap-y-5"}>
    <h1 className={"text-white text-3xl font-primary"}>Create Post</h1>
    <UIInput
      type="text"
      value={content}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
      placeholder={"Content"}
      className={"max-w-[368px]"} />
    {url[0] ? <MediaRenderer src={url[0]} /> : (
      <UIUploadFile
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files[0])}
      />
    )}
    <div className={"max-w-[368px] flex items-center gap-x-3 h-[80px] flex-row justify-start"}>
      <input type={"checkbox"} id={"isPostNFT"} className={"w-[24px] h-[24px]"} checked={isNft} onChange={() => setIsNft(!isNft)}/>
      <label className={"text-white font-light font-primary text-xl"} htmlFor={"isPostNFT"}>Post as NFT</label>
    </div>
    <UIButton
      disabled={content.length === 0 && !url[0]}
      onClick={() => mutate({content, mediaContentUrl : url[0] ? url[0] : ""})}
      className={"blur-btn bg-gray20 " +
        "transition-all delay-150 ease " +
        "text-white hover:bg-[#121212] font-primary " +
        "font-bold text-2xl max-w-[368px]"}
      text={"Create"}
    />
  </div>;
};