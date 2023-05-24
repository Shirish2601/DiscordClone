const express = require("express");

const router = express.Router();
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "../../", "/frontend/views");

router.get("/getpopup", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile(path.join(VIEWS_PATH, "/popup.ejs"));
  // res.sendFile("F:\\College\\Discord Clone\\views\\popup.ejs");
  // res.render(path.join(VIEWS_PATH, "/index"));
});

router.get("/getpopupcreatechannel", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile(path.join(VIEWS_PATH, "/popupcreatechannel.ejs"));
  // res.sendFile("F:\\College\\Discord Clone\\views\\popupcreatechannel.ejs");
});

module.exports = router;
