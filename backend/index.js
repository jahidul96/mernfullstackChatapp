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

// socket

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://192.168.1.4:4000",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (userdata) => {
    socket.join(userdata._id);
    socket.emit("connected");
  });

  socket.on("chat room", (room) => {
    socket.join(room);
    console.log("user joined rooom " + room);
  });

  socket.on("new message", (newmessage, userid, users) => {
    // console.log(newmessage);
    // console.log(user);
    // console.log(users);

    if (!users) return console.log("no chat user found");
    users.forEach((user) => {
      if (user == newmessage.senderId) return;
      socket.in(user).emit("message recived", newmessage);
    });
  });
});
