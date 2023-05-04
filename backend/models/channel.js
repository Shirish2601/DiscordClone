const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: { type: String, required: true },
  messages: [
    {
      sender: { type: String },
      message: { type: String },
      messageid: { type: Schema.Types.ObjectId, ref: "Message" },
      createdAt: { type: String },
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  serverid: { type: Schema.Types.ObjectId, ref: "Server" },
});

module.exports = mongoose.model("Channel", ChannelSchema);
