import { client } from "../../utils/apiClient";

interface Response {
  data: string;
}

export const login = async (address: string, password: string) => {
  await client.post("auth/login", { address, password }).then((response: Response) => {
    localStorage.setItem("liberty-net-token", response.data);
    window.location.href = "/";
  });
};
