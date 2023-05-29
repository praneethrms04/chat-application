import ChatBox from "../components/chatbox/ChatBox";
import MyChat from "../components/mychats/MyChat";
import Navbar from "../components/navbar/Navbar";
import { ChatState } from "../context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();



  return (
    <div style={{ width: "100%" }}>
      {user && <Navbar />}
      <div className="chat-box">
        {user && <MyChat />}
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default ChatPage;
