import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
  id: number;
  content: string;
  mediaContentUrl: string;
  author: User;
  comments: Comment[];
}