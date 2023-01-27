const express = require("express");
const mongoose = require("mongoose");
const db = require("./db");
require("dotenv").config();

// module imports
const authRoutes = require("./routes/user");
const messageRoutes = require("./routes/messageRoutes");

// app initialization
const app = express();

const PORT = 4000;

// middlewares
app.use(express.json());
// module routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// db connection
mongoose.set("strictQuery", true);
db()
  .then(() => console.log("db connected "))
  .catch((err) => {
    console.log(err.message);
  });
// server listen
app.listen(PORT, () => console.log("Server started!!"));
