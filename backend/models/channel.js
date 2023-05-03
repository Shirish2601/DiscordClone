const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: { type: String, required: true },
  messages: [
    {
      message: { type: String, required: true },
      sender: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Channel", ChannelSchema);
