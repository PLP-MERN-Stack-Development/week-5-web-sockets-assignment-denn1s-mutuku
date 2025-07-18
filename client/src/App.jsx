import React from "react";
import { ChatProvider } from "./context/ChatContext";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-3xl h-[90vh] bg-white rounded-xl shadow p-4">
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
