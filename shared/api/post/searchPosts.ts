import { client } from "../../utils/apiClient";
import { Post } from "../../../interfaces/post";

interface Response {
  data: Post[];
}

export const searchPosts = (by: string, text : string) => {
  return client.get<Post[]>(`post/${by}/${text}`).then((r: Response) => r.data);
};