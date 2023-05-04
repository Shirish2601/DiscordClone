const HTTPError = require("../models/HTTPError");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Server = require("../models/server");
const Channel = require("../models/channel");
const path = require("path");

const VIEWS_PATH = path.join(__dirname, "../../", "views");

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
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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
  const server = await Server.findById(serverId).populate("channels");

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
  const { servername, image } = req.body;
  const createdServer = new Server({
    servername,
    image,
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
  // res.status(201).json({ server: createdServer.toObject({ getters: true }) });
  res.redirect(`/me/${createdServer._id}`);
};

const getHomePage = async (req, res, next) => {
  res.render(path.join(VIEWS_PATH, "/index"));
};
const getRegisterPage = async (req, res, next) => {
  res.render(path.join(VIEWS_PATH, "/registerpage"));
};

const getChannelById = async (req, res, next) => {};

exports.getChannelById = getChannelById;
exports.getRegisterPage = getRegisterPage;
exports.getHomePage = getHomePage;
exports.createServer = createServer;
exports.getServerById = getServerById;
exports.getServersPage = getServersPage;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getLoginPage = getLoginPage;
