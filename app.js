const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./backend/routes/server-routes");
const userRoutes = require("./backend/routes/user-routes");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const HTTPError = require("./backend/models/HTTPError");
const session = require("express-session");
const path = require("path");
const mime = require("mime");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

const server = app.listen(5500);

const io = socketIO(server);
io.on("connection", (socket) => {
  console.log(`New client connected here ${socket.id}`);

  socket.on("newMessage", (message) => {
    socket.broadcast.emit("receiveMessage", message);
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  "/public",
  express.static("public", {
    setHeaders: (res, path) => {
      if (mime.getType(path) === "text/css") {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use("/", userRoutes);

app.use(routes);
app.use(express.static(path.join(__dirname, "public")));

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(dotenv.config().parsed.URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
