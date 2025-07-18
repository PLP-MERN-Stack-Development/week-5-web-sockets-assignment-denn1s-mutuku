import React, { useContext, useEffect } from "react";
import ChatContext from "../context/ChatContext";
import socket from "../socket";
import MessageInput from "./MessageInput";
import UserList from "./UserList";
import Notifications from "./Notifications";

const ChatWindow = () => {
  const { messages, setMessages, setTypingUsers } = useContext(ChatContext);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", ({ username, isTyping }) => {
      setTypingUsers((prev) => {
        const updated = { ...prev };
        updated[username] = isTyping;
        return updated;
      });
    });

    return () => {
      socket.off("message");
      socket.off("typing");
    };
  }, []);

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <UserList />
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-xl shadow">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.from}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <MessageInput />
      <Notifications />
    </div>
  );
};

export default ChatWindow;
