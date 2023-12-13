import {NextPage} from "next";
import WithLayout from "../shared/ui/layout/WithLayout";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useContext } from "react";
import { AuthContext } from "../app/AuthProvider";

const Home: NextPage = () => {
  const {user} = useContext(AuthContext)
  return (
    <main className={"text-white"}>
      <MediaRenderer src={user.avatar} />
    </main>
  );
};

export default WithLayout(Home);
