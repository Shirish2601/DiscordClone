const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  sender: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("message", MessageSchema);
