import Message from "../models/Message.js";

export function setupSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("📡 User connected:", socket.id);

    socket.on("send_message", async (data) => {
      const { sender, content } = data;
      const message = new Message({ sender, content });
      await message.save();

      io.emit("receive_message", message);
    });

    socket.on("typing", ({ sender }) => {
      socket.broadcast.emit("user_typing", { sender });
    });

    socket.on("message_read", async (messageId) => {
      await Message.findByIdAndUpdate(messageId, { read: true });
      io.emit("message_read_ack", { messageId });
    });

    socket.on("react_to_message", async ({ messageId, emoji }) => {
      await Message.findByIdAndUpdate(messageId, {
        $push: { reactions: { emoji, user: socket.id } },
      });
      io.emit("message_reacted", { messageId, emoji });
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}
