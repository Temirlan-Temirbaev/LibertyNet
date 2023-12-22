import { client } from "../../utils/apiClient";
import { Conversation } from "../../../interfaces/conversation";

interface Response {
  data: Conversation[];
}

export const getConversations = () => {
  return client.get("conversation").then((r: Response) => {
    return r.data;
  });
};