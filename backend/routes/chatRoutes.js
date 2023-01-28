const Chat = require("../models/chatModel");

const router = require("express").Router();

// create a chat
router.post("/createchat", async (req, res) => {
  try {
    const chatExist = await Chat.findOne({
      members: {
        $all: [req.body.senderId, req.body.reciverId],
      },
    }).populate("members", "-password");

    if (chatExist) {
      return res.status(200).json(chatExist);
    }

    const createChat = new Chat({
      members: [req.body.senderId, req.body.reciverId],
    });
    const chat = await (
      await createChat.save()
    ).populate("members", "-password");

    res.status(200).json({
      message: "new chat created!",
      chat,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a specific chats id!!

router.get("/singlechat", async (req, res) => {
  const { userid, contactid } = req.query;
  try {
    const mychat = await Chat.findOne({
      members: {
        $all: [userid, contactid],
      },
    });

    if (mychat) {
      res.status(200).json(mychat);
    } else {
      res.status(200).json({
        message: "no chat found",
        _id: "",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all chat belongs to a user
router.get("/:id", async (req, res) => {
  try {
    const mychats = await Chat.find({
      members: {
        $in: [req.params.id],
      },
    }).populate("members", "-password");

    res.status(200).json(mychats);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
