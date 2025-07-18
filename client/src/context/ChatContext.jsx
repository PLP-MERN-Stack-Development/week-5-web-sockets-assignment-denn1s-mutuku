import { createContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("User" + Math.floor(Math.random() * 1000));
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        messages,
        setMessages,
        onlineUsers,
        setOnlineUsers,
        typingUsers,
        setTypingUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
