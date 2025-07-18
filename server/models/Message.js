import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    reactions: [{ emoji: String, user: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
