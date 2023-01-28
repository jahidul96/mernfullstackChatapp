const Message = require("../models/messageModel");

const router = require("express").Router();

// post a message
router.post("/postmessage", async (req, res) => {
  try {
    const newmessage = new Message(req.body);
    // const message = await (
    //   await newmessage.save()
    // ).populate("senderId", "-password");

    const msg = await newmessage.save();
    const message = await msg.populate("senderId", "-password");

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get message
router.get("/", async (req, res) => {
  const { chatId } = req.query;
  try {
    let messages = await Message.find({
      chatId: chatId,
    }).populate("senderId", "name email");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
