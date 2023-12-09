import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { Greeting } from "../../shared/ui/auth/Greeting";
import { UIInput } from "../../shared/ui/UI-Input";
import { UIButton } from "../../shared/ui/UI-Button";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { LoginBody } from "../../interfaces/auth/loginBody";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../shared/api/auth/login";
import { LoginErrors } from "../../interfaces/auth/loginErrors";

export const LoginWidget = () => {

  const address = useAddress();

  const {
    handleSubmit,
    register,
    formState,
  } = useForm<LoginBody>();


  const loginRequest = useMutation({
    mutationFn: async (body: LoginBody) => await login(String(address), body.password),
    onError: () => {
      toast.error("Invalid address or password");
    },
  });

  const onSubmit: SubmitHandler<LoginBody> = (data: LoginBody) => address && loginRequest.mutate(data);
  const { password }: FieldErrors<LoginErrors> = formState.errors;

  return <form onSubmit={handleSubmit(onSubmit)}
               className={"flex flex-col gap-y-5 h-screen justify-center items-center"}>
    <ColorRing
      visible={loginRequest.isLoading}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
    <Greeting />
    <ConnectWallet
      className={"!text-white !tracking-wide  !bg-bluePrimary !backdrop-blur-lg"} />
    <UIInput
      className={"max-w-[368px]"}
      type={"password"}
      placeholder={"Password"}
      error={password?.message}
      additional={{
        ...register("password", {
          required: {
            value: true,
            message: "Fill this field",
          },
          minLength : {
            value : 5,
            message : "Too Short",
          },
        }),
      }}
    />

    <UIButton
      type={"submit"}
      className={"max-w-[368px] text-white font-light text-xl"} text={"Login"} />
    <p className={"text-white tracking-wider"}>
      Don't have an account? <Link href="/auth/register" className={"text-bluePrimary underline"}>Register</Link>
    </p>
  </form>;
};