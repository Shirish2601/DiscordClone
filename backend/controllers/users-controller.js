const HTTPError = require("../models/HTTPError");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const path = require("path");

const VIEWS_PATH = path.join(__dirname, "../../", "views");
// const DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "Bruh",
//     email: "test@test.com",
//     password: "test",
//   },
//   {
//     id: "u2",
//     name: "Bruh2",
//     email: "test@test1.com",
//     password: "test",
//   },
//   {
//     id: "u3",
//     name: "Bruh3",
//     email: "testtest@test.com",
//     password: "test",
//   },
// ];
// const getUserById = (req, res, next) => {
//   const userId = req.params.uid;
//   const user = DUMMY_USERS.find((u) => {
//     return u.id === userId;
//   });

//   if (!user) {
//     throw new HTTPError("Could not find user for the provided id.", 404);
//   }
//   res.json({ user });
// };

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
  res.json({ user: user.toObject({ getters: true }) });
};

const getLoginPage = async (req, res, next) => {
  res.render(path.join(VIEWS_PATH, "/loginpage"));
};
const getServersPage = async (req, res, next) => {
  const user = req.session.user;
  res.render(path.join(VIEWS_PATH, "/me/servers"), { user: user });
};

exports.getServersPage = getServersPage;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getLoginPage = getLoginPage;
