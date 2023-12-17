import { client } from "../../utils/apiClient";

interface Response {
  data: {
    id: number;
  };
}

export const startConversationApi = (from: string, to: string) => {
  return client.post(`/conversation?addresses=${from},${to}`).then((r: Response) => {
    return r.data.id;
  });
};