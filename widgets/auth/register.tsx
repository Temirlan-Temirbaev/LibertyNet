import { ChangeEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ConnectWallet, MediaRenderer, useAddress, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import { Greeting } from "../../shared/ui/auth/Greeting";
import { UIInput } from "../../shared/ui/UI-Input";
import { UIUploadFile } from "../../shared/ui/UI-UploadFile";
import { UIButton } from "../../shared/ui/UI-Button";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../interfaces/user";
import { RegistrationErrors } from "../../interfaces/auth/registrationErrors";
import { useMutation } from "@tanstack/react-query";
import { registrationApi } from "../../shared/api/auth/register";
import { toast } from "react-toastify";
import { ContractContext } from "../../app/ContractProvider";

export const RegisterWidget = () => {

  const {
    handleSubmit,
    register,
    formState,
  } = useForm<User>();

  const address = useAddress();


  const {userContract} = useContext(ContractContext);

  const {mutateAsync : uploadAsNft} = useContractWrite(userContract, "mintUserNFT")

  const [file, setFile] = useState<File | undefined>(undefined);
  const [url, setUrl] = useState<string[]>([]);
  const [asNft, setAsNft] = useState(false);

  const { mutateAsync: uploadImage } = useStorageUpload();

  const registration = useMutation({
    mutationFn: (data: User) => {
      if (!asNft) return registrationApi({ ...data, address: String(address), avatar: url[0] }).finally(() => {
        window.location.href = "/";
      });
      registrationApi({ ...data, address: String(address), avatar: url[0] });
      return uploadAsNft({args : [data.nickname, url[0]]}).finally(() => window.location.href = "/")
    },
    onError: (error: { response: { data: { errors: Record<string, any> } } }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
      Object.values(error.response?.data.errors).map(error => toast.error(error[0]));
    },
  });


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
  console.log(asNft);
  const onSubmit: SubmitHandler<User> = (data: User) => (address && url[0]) && registration.mutate(data);

  const { nickname, password }: FieldErrors<RegistrationErrors> = formState.errors;

  return <form onSubmit={handleSubmit(onSubmit)}
               className={"flex flex-col gap-y-5 h-screen justify-center items-center"}>
    <Greeting />
    <ConnectWallet className={"!text-white !tracking-wide !bg-bluePrimary !backdrop-blur-lg"} />
    <UIInput
      type="text"
      placeholder={"Nickname"}
      error={nickname?.message}
      additional={{
        ...register("nickname", {
          required: {
            value: true,
            message: "Fill this field",
          },
        }),
      }}
      className={"max-w-[368px]"} />
    <UIInput
      type="password"
      placeholder={"Password"}
      error={password?.message}
      additional={{
        ...register("password", {
          required: {
            value: true,
            message: "Fill this field",
          },
          minLength: {
            value: 5,
            message: "Too Short",
          },
        }),
      }}
      className={"max-w-[368px]"} />
    {url[0] ? <MediaRenderer src={url[0]} /> : (
      <UIUploadFile
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files[0])}
      />
    )}
    <div className={"max-w-[368px] flex items-center gap-x-3 h-[80px] flex-row justify-start"}>
      <input type={"checkbox"} id={"isPostNFT"} className={"w-[24px] h-[24px]"} checked={asNft} onChange={() => setAsNft(!asNft)}/>
      <label className={"text-white font-light font-primary text-xl"} htmlFor={"isPostNFT"}>Register as NFT</label>
    </div>
    <UIButton className={"max-w-[368px] text-white font-light text-xl bg-bluePrimary"} text={"Register"} />
    <p className={"text-white tracking-wide"}>
      Already have an account? <Link href="/auth/login" className={"text-bluePrimary underline"}>Login</Link>
    </p>
  </form>;
};