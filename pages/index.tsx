import {NextPage} from "next";
import WithLayout from "../shared/ui/layout/WithLayout";

const Home: NextPage = () => {
  return (
    <main className={"text-white"}>
      test
    </main>
  );
};

export default WithLayout(Home);
