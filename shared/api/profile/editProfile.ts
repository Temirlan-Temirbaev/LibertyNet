import { User } from "../../../interfaces/user";
import { client } from "../../utils/apiClient";


export const editProfile = (body : Partial<User>) => {
  return client.put("auth/profile", body)
}