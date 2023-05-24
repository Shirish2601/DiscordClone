const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/server-routes");
const userRoutes = require("./routes/user-routes");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const HTTPError = require("./models/HTTPError");
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
// console.log(path.join(__dirname, "../frontend/views"));
app.set("views", path.join(__dirname, "../frontend/views"));
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
app.use(express.static(path.join(__dirname, "../", "frontend/public")));
console.log(path.join(__dirname, "../", "frontend/public"));

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(dotenv.config().parsed.MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
