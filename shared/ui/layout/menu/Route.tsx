import { SidebarRoute } from "../../../../interfaces/layout/sidebarRoutes";
import Link from "next/link";
import { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { useRouter } from "next/router";

type RouteProps = {
  route: SidebarRoute
} & HTMLAttributes<HTMLLinkElement> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof string>


export const Route = ({ route, ...props }: RouteProps) => {

  const router = useRouter();

  const isPathEqual = router.pathname === route.path;

  return <Link
    {...props} href={route.path}
    className={`flex justify-center items-center 
    w-full h-[50px] rounded-md blur-btn 
    ${isPathEqual ? "bg-gray70" : "bg-gray20"}
     text-white font-bold text-xl ${props.className}`}>
    {route.label}
  </Link>;
};