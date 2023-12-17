import { client } from "../../utils/apiClient";
import { User } from "../../../interfaces/user";

interface Response {
  data: User;
}

export const getProfile = (address: string) => {
  return client.get(`auth/profile/${address}`).then((r: Response) => {
    return r.data;
  });
};