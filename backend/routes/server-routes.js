const express = require("express");
const ServerSchema = require("../models/server");

const router = express.Router();
const DUMMY_SERVERS = [
  {
    id: "s1",
    name: "Server 1",
    channels: [
      {
        id: "c1",
        name: "Channel 1",
      },
      {
        id: "c2",
        name: "Channel 2",
      },
    ],
  },
];

router.get("/getpopup", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile("F:\\College\\Discord Clone\\views\\popup.ejs");
});

router.get("/getpopupcreatechannel", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile("F:\\College\\Discord Clone\\views\\popupcreatechannel.ejs");
});

// router.post("/createserver", (req, res, next) => {
//   const { serverName } = req.body;

//   ")

module.exports = router;
