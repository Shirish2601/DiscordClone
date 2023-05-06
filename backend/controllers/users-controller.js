const HTTPError = require("../models/HTTPError");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Server = require("../models/server");
const Channel = require("../models/channel");
const Message = require("../models/message");
const path = require("path");

const VIEWS_PATH = path.join(__dirname, "../../", "views");

const generateJoinCode = () => {
  let code = "";
  let alphabets = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 26);
    code += alphabets[random];
  }
  return code;
};

const getDiscriminator = async (username) => {
  let maxDiscrim = -1;
  let users = await User.find();
  users.forEach((user) => {
    if (user.username === username) {
      let discrim = user.discriminator;
      maxDiscrim = Math.max(maxDiscrim, Number(discrim));
    }
  });
  maxDiscrim = Number(maxDiscrim) + 1;
  maxDiscrim = maxDiscrim.toString();
  if (maxDiscrim.length < 4) {
    while (maxDiscrim.length < 4) {
      maxDiscrim = "0" + maxDiscrim;
    }
  }
  if (maxDiscrim === "0000") return "0001";
  return maxDiscrim;
};

const checkIfUserAlreadyExists = async (email) => {
  let users = await User.find();
  let exists = false;
  users.forEach((user) => {
    if (user.email === email) {
      exists = true;
    }
  });
  return exists;
};

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HTTPError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }
  const { username, email, password, image } = req.body;
  let exists = await checkIfUserAlreadyExists(email);
  if (exists) {
    const error = new HTTPError(
      "User with this email already exists, please try different email.",
      422
    );
    return next(error);
  }
  let discrim = await getDiscriminator(username);
  const createdUser = new User({
    username,
    email,
    password,
    discriminator: discrim,
    image,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HTTPError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  req.session.user = createdUser;

  // res.render(path.join(VIEWS_PATH, "/me/"), { user: createdUser });
  res.redirect("/me");

  // res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HTTPError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HTTPError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!user || user.password !== password) {
    const error = new HTTPError("Incorrect Password, please try again.", 401);
    return next(error);
  }
  req.session.user = user;
  res.redirect("/me");
};

const getLoginPage = async (req, res, next) => {
  res.render(path.join(VIEWS_PATH, "/loginpage"));
};
const getServersPage = async (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.redirect("/login");

  const servers = await Server.find({ members: user._id });

  res.render(path.join(VIEWS_PATH, "/me/server"), {
    user: user,
    servers: servers,
  });
};
const getServerById = async (req, res, next) => {
  const serverId = req.params.sid;
  const server = await Server.findById(serverId).populate(["channels"]);
  const user = req.session.user;
  if (!user) return res.redirect("/login");
  const servers = await Server.find({ members: user._id });

  res.render(path.join(VIEWS_PATH, "/server/channel"), {
    server: server,
    user: req.session.user,
    servers: servers,
  });
};

const createServer = async (req, res, next) => {
  let joincode = generateJoinCode();
  let exists = await Server.findOne({ joincode: joincode });
  while (exists) {
    joincode = generateJoinCode();
    exists = await Server.findOne({ joincode: joincode });
  }

  const { servername, image } = req.body;
  const createdServer = new Server({
    servername,
    image,
    joincode,
  });

  try {
    await createdServer.save();

    const firstChannel = new Channel({
      name: "Welcome",
      messages: [],
      serverid: createdServer._id,
    });

    await firstChannel.save();
    createdServer.channels.push(firstChannel);
    const user = req.session.user;
    createdServer.members.push(user);
    await createdServer.save();
  } catch (err) {
    console.log(err);
    const error = new HTTPError(
      "Creating server failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({ server: createdServer.toObject({ getters: true }) });
  // res.redirect(`/me/${createdServer._id}`);
};

const getHomePage = async (req, res, next) => {
  res.render(path.join(VIEWS_PATH, "/index"));
};
const getRegisterPage = async (req, res, next) => {
  res.render(path.join(VIEWS_PATH, "/registerpage"));
};

const getChannelById = async (req, res, next) => {
  const channelId = req.params.cid;
  const channel = await Channel.findById(channelId).populate("messages");
  const user = req.session.user;
  if (!user) return res.redirect("/login");
  const servers = await Server.find({ members: user._id });
  const server = await Server.findById(channel.serverid).populate("members");
  const messages = await Message.find({ channelid: channelId }).populate(
    "user"
  );
  res.render(path.join(VIEWS_PATH, "/layout/layout"), {
    user: user,
    servers: servers,
    server: server,
    channel: channel,
    messages: messages,
  });
};
const createChannel = async (req, res, next) => {
  const { name, serverid } = req.body;
  const createdChannel = new Channel({
    name,
    serverid,
  });
  try {
    await createdChannel.save();
    const server = await Server.findById(serverid);
    server.channels.push(createdChannel);
    await server.save();
  } catch (err) {
    console.log(err);
    const error = new HTTPError(
      "Creating channel failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({ channel: createdChannel.toObject({ getters: true }) });
};

const createMessage = async (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    const error = new HTTPError("Message not sent!", 401);
    return next(error);
  }
  const { message, channelid } = req.body;

  const createdAt = new Date().getHours() + ":" + new Date().getMinutes();
  const createdMessage = new Message({
    message,
    channelid,
    createdAt,
  });

  const sender = await User.findById(req.session.user._id);
  try {
    createdMessage.sender = sender.username;
    createdMessage.user = sender;
    await createdMessage.save();
    const getChannel = await Channel.findById(channelid);
    getChannel.messages.push(createdMessage);
    await getChannel.save();
  } catch (err) {
    console.log(err);
    const error = new HTTPError(
      "Creating message failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    message: createdMessage.toObject({ getters: true }),
    user: sender,
  });
};

const joinServer = async (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    const error = new HTTPError("Server not joined!", 401);
    return next(error);
  }
  const { joincode } = req.body;
  const server = await Server.findOne({ joincode: joincode });
  if (!server) {
    const error = new HTTPError("Server not found!", 404);
    return next(error);
  }
  if (server.members.includes(user._id)) {
    const error = new HTTPError("Server already joined!", 401);
    return next(error);
  }
  try {
    server.members.push(user);
    await server.save();
  } catch (err) {
    console.log(err);
    const error = new HTTPError(
      "Joining server failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({ server: server.toObject({ getters: true }) });
  // res.redirect(`/me/${server._id}`);
};

const getMessages = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const channel = await Channel.findById(cid).populate("messages");
    // populate channel messages user
    const messages = channel.messages;
    // messages.forEach(async (message) => {
    //   message.populate("user");
    // });
    res.status(201).json({ messages: channel.messages });
  } catch (err) {
    console.log(err);
    const error = new HTTPError(
      "Fetching messages failed, please try again later.",
      500
    );
    return next(error);
  }
};

exports.getMessages = getMessages;
exports.joinServer = joinServer;
exports.createMessage = createMessage;
exports.createChannel = createChannel;
exports.getChannelById = getChannelById;
exports.getRegisterPage = getRegisterPage;
exports.getHomePage = getHomePage;
exports.createServer = createServer;
exports.getServerById = getServerById;
exports.getServersPage = getServersPage;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getLoginPage = getLoginPage;
