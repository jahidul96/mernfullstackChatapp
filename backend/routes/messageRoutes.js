const Message = require("../models/messageModel");

const router = require("express").Router();

// post a message
router.post("/postmessage", async (req, res) => {
  try {
    const newmessage = new Message(req.body);
    const message = await newmessage.save();

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get message
router.get("/", async (req, res) => {
  const { from, to } = req.query;
  try {
    const messages = await Message.find({
      chatmembers: {
        $all: [from, to],
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
