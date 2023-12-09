import { PropsWithChildren, createContext } from "react";
import { useRouter } from "next/router";
import { checkAuth } from "../shared/api/auth/checkAuth";
import { ColorRing } from "react-loader-spinner";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropsWithChildren) => {

  const router = useRouter();
  const isAuth = router.pathname.includes("/auth");

  const logout = () => {
    localStorage.removeItem("uapp-token");
    location.reload();
  };

  const { userData, refetch, isLoading } = checkAuth(!isAuth);
  if ((isLoading || !userData) && !isAuth) return <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperClass="blocks-wrapper"
    colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
  />;

  return <AuthContext.Provider value={{ user: userData, logout, refetch }}>{children}</AuthContext.Provider>;
};