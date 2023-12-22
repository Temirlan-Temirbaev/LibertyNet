import { Message as MessageInterface } from "../../../interfaces/message";
import { useContext } from "react";
import { AuthContext } from "../../../app/AuthProvider";


interface MessageProps {
  message: MessageInterface;
}

export const Message = ({ message }: MessageProps) => {
  const { user } = useContext(AuthContext);

  return <div
    className={`${user?.address === message.author ? "bg-bluePrimary blur-btn" : "bg-gray10 blur-btn"} min-w-[280px] w-[50%] overflow-auto min-h-[50px] p-5 rounded-xl text-white`}>
    {message.content}
  </div>;
};