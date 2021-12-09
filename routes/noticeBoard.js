const router = require("express").Router();
const NoticeBoard = require("../models/noticeBoard");

router.get("/", async (req, res) => {
  const messages = await NoticeBoard.find()
    .populate("name", "username id")
    .sort({ date: "asc" });

  try {
    res.send(messages);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  const newMessage = new NoticeBoard(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.send(savedMessage);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
