const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: { type: String, required: true },
  messages: [
    {
      message: { type: Schema.Types.ObjectId, ref: "message" },
      createdAt: { type: Date, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  serverid: { type: Schema.Types.ObjectId, ref: "Server" },
});

module.exports = mongoose.model("Channel", ChannelSchema);
