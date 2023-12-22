import { client } from "../../utils/apiClient";
import { Conversation } from "../../../interfaces/conversation";

interface Response {
  data: Conversation;
}

export const getConversationsById = (id: number) => {
  return client.get(`conversation/${id}`).then((r: Response) => r.data);
};