import { User } from "../../../interfaces/user";
import { client } from "../../utils/apiClient";
interface Response {
  data: string;
}
export const registrationApi = (data : User) => {
  return client.post("auth/register", data).then((response : Response) => {
    localStorage.setItem("liberty-net-token", response.data);
  });
};
