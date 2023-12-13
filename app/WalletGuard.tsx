import { ConnectWallet, useAddress, useWallet } from "@thirdweb-dev/react";
import { PropsWithChildren, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { UIButton } from "../shared/ui/UI-Button";


export const WalletGuard = ({ children }: PropsWithChildren) => {
  const wallet = useWallet();
  const address = useAddress();
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user && address) {
      if (user.address !== address) {
        localStorage.removeItem("__TW__/coordinatorStorage/lastConnectedWallet");
        localStorage.removeItem("__TW__/metamask/injected.shimDisconnect");
        toast.error("Don't connect to another wallet, which not authorized to your account")
        location.reload();
      }
    }
  }, [address, wallet]);
  if (!wallet && !router.pathname.includes("/auth")) {
    return <div className={"w-full h-screen flex-col gap-y-4 flex justify-center items-center bg-[#121212]"}>
      <h1 className={"text-4xl text-white font-primary"}>Please connect wallet</h1>
      <ConnectWallet className={"!w-[320px] !h-[40px] !blur-btn"} />
      <UIButton
        text={"Log out"}
        onClick={logout}
        className={"blur-btn max-w-[300px] h-[40px] text-white"}
      />
    </div>;
  }

  return <>{children}</>;
};