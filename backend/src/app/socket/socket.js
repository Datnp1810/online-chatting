import { Server } from "socket.io";
import htpp from "http";
import express from "express";

const app = express();

const server = htpp.createServer(app);
const io = new Server(server, {
  cors: {
    //Đây là Port của Frontend
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    console.log("Đã dừng lại", socket.id);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
