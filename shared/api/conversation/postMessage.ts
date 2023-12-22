import { client } from "../../utils/apiClient";


export const postMessage = (content: string, conversationId: number) => {
  return client.post("message", { content, conversationId });
};