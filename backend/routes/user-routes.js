const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users-controller");
const { check } = require("express-validator");

// router.get("/:uid", UserController.getUserById);

router.get("/", UserController.getHomePage);

router.get("/login/", UserController.getLoginPage);

router.get("/me/servers/:sid", UserController.getServerById);
router.get("/me/servers/", UserController.getServersPage);

router.post("/me/servers/", UserController.createServer);

router.post(
  "/login/",
  [check("email").isEmail(), check("password").isLength({ min: 2 })],
  UserController.loginUser
);
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
router.get("/register/", UserController.getRegisterPage);

module.exports = router;
