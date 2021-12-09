const mongoose = require("mongoose");
const User = require("./user.js");

const noticeBoardSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  topic: {
    type: String,
    maxlength: 40,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NoticeBoard", noticeBoardSchema);
