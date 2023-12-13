import WithLayout from "../../shared/ui/layout/WithLayout";
import { EditProfile } from "../../widgets/profile/EditProfile";

const EditProfilePage = () => {
  return <div>
    <EditProfile />
  </div>
}

export default WithLayout(EditProfilePage)