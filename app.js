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

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PATCH");
//   next();
// });
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   const error = new HTTPError("Could not find this route", 404);
//   throw error;
// });

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://tempmail1289749:dkte123@cluster0.wdduehx.mongodb.net/DiscordClone"
  )
  .then(() => {
    app.listen(5500);
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// const User = require("./models/user");
// const getUsers = (req, res, next) => {
//   User.find()
//     .then((users) => {
//       console.log(users);
//       users.map((user) => {
//         console.log(user._id.toString());
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
