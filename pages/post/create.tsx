
import WithLayout from "../../shared/ui/layout/WithLayout";
import { CreatePost } from "../../widgets/post/createPost";

const CreatePostPage = () => {
  return <div>
   <CreatePost />
  </div>
};


export default WithLayout(CreatePostPage);