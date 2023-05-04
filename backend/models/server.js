const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const ServerSchema = new Schema({
//   servername: { type: String, required: true },
//   image: { type: String, required: true },
//   channels: [
//     {
//       channelId: { type: String, required: true },
//       name: { type: String, required: true },
//       messages: [
//         {
//           messageId: { type: String, required: true },
//           message: { type: String, required: true },
//           sender: { type: String, required: true },
//           createdAt: { type: Date, default: Date.now },
//         },
//       ],
//     },
//   ],
// });

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
});

module.exports = mongoose.model("Server", ServerSchema);
