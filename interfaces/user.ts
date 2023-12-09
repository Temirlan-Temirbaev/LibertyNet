import { Post } from "./post";

export interface User {
  id : number;
  address : string;
  nickname : string;
  avatar : string;
  isBanned : boolean;
  role : string;
  password : string;
  posts : Post[];
}