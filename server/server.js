import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocketHandlers } from "./socket/socketHandler.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

setupSocketHandlers(io);

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes); // 👈 Add this

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // These options are now unnecessary and deprecated
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
