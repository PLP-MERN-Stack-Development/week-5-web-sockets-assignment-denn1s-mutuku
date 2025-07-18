import React, { useState, useContext } from "react";
import socket from "../socket";
import ChatContext from "../context/ChatContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(ChatContext);

  const handleSend = () => {
    if (!message.trim()) return;
    socket.emit("message", { from: user, content: message });
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", { username: user, isTyping: true });
    setTimeout(() => {
      socket.emit("typing", { username: user, isTyping: false });
    }, 1500);
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 px-4 py-2 border rounded-xl"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleTyping}
        placeholder="Type a message"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-xl">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
