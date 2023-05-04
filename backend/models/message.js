const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  sender: { type: String },
  createdAt: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  channelid: { type: Schema.Types.ObjectId, ref: "Channel" },
});

module.exports = mongoose.model("message", MessageSchema);
