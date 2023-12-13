import { client } from "../../utils/apiClient";

export const createComment = (postId : number, content : string) => {
  return client.post("comment", {postId, content})
}