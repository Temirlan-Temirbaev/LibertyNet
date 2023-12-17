import { Post } from "../../../interfaces/post";
import { client } from "../../utils/apiClient";

interface Response {
  data: Post[];
}

export const getByAddress = (address: string) => {
  return client.get(`post/address/${address}`).then((r: Response) => {
    return r.data;
  });
};