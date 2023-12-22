import { User } from "./user";
import { Message } from "./message";

export interface Conversation {
  users: User[],
  id: number;
  messages: Message[];
}