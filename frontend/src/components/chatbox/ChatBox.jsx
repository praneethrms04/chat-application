import React from "react";

import "./chatbox.css";
const ChatBox = () => {
  return (
    <>
      <div className="chat-container">
        <div className="chat-header">WhatsApp Chat</div>
        <div className="chat-messages">{/* Render chat messages here */}</div>
        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
