const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users-controller");
const { check } = require("express-validator");

// router.get("/:uid", UserController.getUserById);

router.get("/", UserController.getHomePage);

router.get("/me/:sid/:cid", UserController.getChannelById);
router.get("/me/:sid", UserController.getServerById);
router.get("/me/", UserController.getServersPage);
router.post("/me/", UserController.createServer);

router.post(
  "/login/",
  [check("email").isEmail(), check("password").isLength({ min: 2 })],
  UserController.loginUser
);
router.post("/createchannel", UserController.createChannel);

router.get("/login/", UserController.getLoginPage);

router.post("/createmessage", UserController.createMessage);

router.post(
  "/register/",
  [
    check("username").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 2 }),
    check("discriminator").optional().isLength({ min: 4 }),
    check("image").optional().isURL(),
  ],
  UserController.registerUser
);

router.delete("/:sid/leaveserver", UserController.leaveServer);

router.post("/joinserver", UserController.joinServer);

router.get("/register/", UserController.getRegisterPage);

router.post("/joinserver/", UserController.joinServer);

router.get("/getmessages/:cid", UserController.getMessages);
module.exports = router;
