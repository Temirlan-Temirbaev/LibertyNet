import { ConversationsList } from "../widgets/chat/conversation/ConversationsList";
import { Content } from "../widgets/chat/content/Content";
import WithLayout from "../shared/ui/layout/WithLayout";

const Chat = () => {
  return <div className={"flex gap-x-5"}>
    <ConversationsList />
    <Content />
  </div>;
};

export default WithLayout(Chat);