import { client } from "../../utils/apiClient";
import { Post } from "../../../interfaces/post";

interface Response {
  data : Post;
}

export const createPost = (body : Partial<Post>) => {
  return client.post<Post>("post", body).then((r : Response) => {
    return r.data;
  });
}