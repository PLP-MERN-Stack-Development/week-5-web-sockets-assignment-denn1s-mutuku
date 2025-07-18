import React, { useContext } from "react";
import ChatContext from "../context/ChatContext";

const UserList = () => {
  const { onlineUsers, typingUsers } = useContext(ChatContext);

  return (
    <div className="mb-4">
      <h2 className="font-bold">Online Users</h2>
      <ul className="text-sm space-y-1">
        {onlineUsers.map((user) => (
          <li key={user}>
            {user} {typingUsers[user] ? "⤵️ typing..." : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
