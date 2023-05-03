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
  res.sendFile("F:\\College\\Discord Clone\\popup.html");
});

router.get("/getpopup.css", (req, res, next) => {
  res.set("Content-Type", "text/css");
  res.sendFile("F:\\College\\Discord Clone\\popup.css");
});

router.get("/channels/:serverId/:channelId/", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile("F:\\College\\Discord Clone\\HTML\\channels.html");
});

router.get("/channels/", (req, res, next) => {
  res.set("Content-Type", "text/css");
  res.sendFile("F:\\College\\Discord Clone\\HTML\\channels.css");
});
router.get("/gettextarea/", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.sendFile("F:\\College\\Discord Clone\\HTML\\textarea.html");
});
router.get("/gettextarea.css", (req, res, next) => {
  res.set("Content-Type", "text/css");
  res.sendFile("F:\\College\\Discord Clone\\HTML\\textarea.css");
});

// router.post("/createserver", (req, res, next) => {
//   const { serverName } = req.body;

//   ")

router.get("/channels/:serverId/:channelId/", (req, res, next) => {
  const channelId = req.params.channelId;
  const serverId = req.params.serverId;
  const server = DUMMY_SERVERS.find((server) => server.id === serverId);
  const channel = server.channels.find((channel) => channel.id === channelId);

  res.set("Content-Type", "text/html");
  res.sendFile("F:\\College\\Discord Clone\\HTML\\channels.html");
});

router.post("/testserver", (req, res, next) => {
  res.set("Content-Type", "application/json");

  const { servername, image, channels, members } = req.body;
  const server = new ServerSchema({
    servername,
    image,
    channels,
    members,
  });

  res.status(201).json({ server });
});

module.exports = router;
