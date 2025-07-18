import { sendReadReceipt, sendReaction } from "../socket";
import { useEffect } from "react";

const Message = ({ msg }) => {
  useEffect(() => {
    sendReadReceipt(msg.id);
  }, [msg.id]);

  const handleReact = (emoji) => {
    sendReaction(msg.id, emoji);
  };

  return (
    <div className="bg-gray-100 p-2 rounded shadow">
      <p><strong>{msg.sender}:</strong> {msg.text}</p>
      {msg.reactions && (
        <p className="text-xs mt-1">❤️ {msg.reactions.join(" ")}</p>
      )}
      <div className="mt-1 space-x-2 text-xs">
        <button onClick={() => handleReact("👍")}>👍</button>
        <button onClick={() => handleReact("❤️")}>❤️</button>
        <button onClick={() => handleReact("😂")}>😂</button>
      </div>
    </div>
  );
};

export default Message;
