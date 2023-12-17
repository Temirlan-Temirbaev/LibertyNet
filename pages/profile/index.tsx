import { useContext, useEffect } from "react";
import { AuthContext } from "../../app/AuthProvider";
import { useRouter } from "next/router";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user) router.push(`/profile/${user.address}`);
  }, [user]);

  return <div></div>;
};

export default Profile;