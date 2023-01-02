// server/index.js

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.status(200).json("working");
});

io.on("connection", (socket) => {
  console.log("New Message");

  socket.on("message", (data) => {
    socket.broadcast.emit("receiveMsg", data);
  });

  socket.on("disconnect", () => {
    io.emit("message", " A user  left sdsads the chat");
  });
});

server.listen(5000, () => "Server is running on port 3000");
