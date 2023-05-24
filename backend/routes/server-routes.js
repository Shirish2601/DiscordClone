const express = require("express");

const router = express.Router();

router.get("/getpopup", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile("F:\\College\\Discord Clone\\views\\popup.ejs");
});

router.get("/getpopupcreatechannel", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile("F:\\College\\Discord Clone\\views\\popupcreatechannel.ejs");
});

module.exports = router;
