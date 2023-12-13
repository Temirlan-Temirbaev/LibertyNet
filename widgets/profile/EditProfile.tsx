import { UIInput } from "../../shared/ui/UI-Input";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { MediaRenderer, useAddress, useContractRead, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import { UIUploadFile } from "../../shared/ui/UI-UploadFile";
import { UIButton } from "../../shared/ui/UI-Button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ContractContext } from "../../app/ContractProvider";
import { editProfile as editProfileApi } from "../../shared/api/profile/editProfile";
import { AuthContext } from "../../app/AuthProvider";

export const EditProfile = () => {

  const { userContract } = useContext(ContractContext);
  const { user } = useContext(AuthContext);

  const [nickName, setNickName] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [url, setUrl] = useState<string[]>([]);
  const { mutateAsync: uploadImage } = useStorageUpload();
  const address = useAddress();
  const { data } = useContractRead(userContract, "getTokenByAddress", [address], { from: address });
  const { mutateAsync: editUserNFT } = useContractWrite(userContract, "updateNicknameAndAvatar");

  useEffect(() => {
    onChangeFile();
  }, [file]);

  const onChangeFile = async () => {
    const uploadUrl = await uploadImage({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });

    setUrl(uploadUrl);
  };

  const editProfile = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: async () => {
      if (!user) return null;
      if (data) {
        await editUserNFT({
          args: [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
            parseInt(data._hex, 16),
            nickName === "" ? user?.nickname : nickName,
            url[0] ? url[0] : user?.avatar,
          ],
        });
      }
      return editProfileApi({
        nickname: nickName === "" ? user?.nickname : nickName,
        avatar: url[0] ? url[0] : user.avatar,
      });
    },
    onSuccess: () => {
      toast.success("User was successfully updated");
    },
    onError: (e: Error) => {
      toast.error(`An error has occurred ${JSON.stringify(e)}`);
    },
  });

  return <div className={"flex flex-col items-center gap-y-5"}>
    <h1 className={"text-white text-3xl font-primary"}>Edit Profile</h1>
    <UIInput
      type="text"
      value={nickName}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setNickName(e.target.value)}
      placeholder={"Nickname"}
      className={"max-w-[368px]"} />
    {url[0] ? <MediaRenderer src={url[0]} /> : (
      <UIUploadFile
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files[0])}
      />
    )}
    <UIButton
      onClick={() => editProfile.mutate()}
      className={"blur-btn bg-gray20 " +
        "transition-all delay-150 ease " +
        "text-white hover:bg-[#121212] font-primary " +
        "font-bold text-2xl max-w-[368px]"}
      text={"Save"}
    />
  </div>;
};