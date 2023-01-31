const express = require("express");
const mongoose = require("mongoose");
const db = require("./db");
require("dotenv").config();

// module imports
const authRoutes = require("./routes/user");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");

// app initialization
const app = express();

const PORT = 4000;

// middlewares
app.use(express.json());
// module routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

// db connection
mongoose.set("strictQuery", true);
db()
  .then(() => console.log("db connected "))
  .catch((err) => {
    console.log(err.message);
  });

// server listen
const server = app.listen(PORT, () => console.log("Server started!!"));

// socket initialization
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://192.168.1.4:4000",
  },
});

io.on("connection", (socket) => {
  socket.on("chat room", (chatId) => {
    socket.join(chatId);
    socket.emit("connected");
    // console.log("user connected to room " + chatId);
  });

  socket.on("new message", (newmessage, chatId) => {
    // console.log(newmessage);
    socket.in(chatId).emit("message recived", newmessage);
  });

  socket.on("typing", (chatId) => {
    socket.to(chatId).emit("typing");
  });
  socket.on("stop typing", (chatId) => {
    socket.to(chatId).emit("stop typing");
  });
});
