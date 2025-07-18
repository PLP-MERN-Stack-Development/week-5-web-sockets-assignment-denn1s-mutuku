import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// GET /api/messages - fetch chat history
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }); // oldest to newest
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST /api/messages - create new message
router.post("/", async (req, res) => {
  const { sender, content } = req.body;

  try {
    const newMessage = new Message({ sender, content });
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
