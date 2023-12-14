import { client } from "../../utils/apiClient";
import { Post } from "../../../interfaces/post";

interface Response {
  data : Post
}

export const getPostById = (id : number) => {
  return client.get(`post/id/${id}`).then((r : Response) => {
    return r.data;
  })
}