const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
  servername: { type: String, required: true },
  image: { type: String, required: true },
  channels: [
    {
      channelId: { type: Schema.Types.ObjectId, ref: "Channel" },
      name: { type: String, required: true },
    },
  ],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  joincode: { type: String, unique: true },
});

module.exports = mongoose.model("Server", ServerSchema);
