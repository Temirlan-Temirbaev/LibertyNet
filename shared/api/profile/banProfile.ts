import { client } from "../../utils/apiClient";

export const banProfile = (address: string) => {
  return client.patch("/moderator/ban", address);
};