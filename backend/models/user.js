const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  discriminator: { type: String },
  image: {
    type: String,
    default: "https://i.imgur.com/6VBx3io.png",
  },
});

module.exports = mongoose.model("User", UserSchema);
