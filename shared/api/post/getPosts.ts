import { client } from "../../utils/apiClient";
import { Post } from "../../../interfaces/post";

interface Response {
  data: Post[];
}

export const getPosts = (page: number) => {
  return client.get<Post[]>(`post/${page}`).then((r: Response) => r.data);
};