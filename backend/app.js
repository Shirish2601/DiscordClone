const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/server-routes");
const userRoutes = require("./routes/user-routes");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const HTTPError = require("./models/HTTPError");
const ejsMate = require("ejs-mate");
const path = require("path");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../", "views"));

app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoutes);

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

app.use((req, res, next) => {
  const error = new HTTPError("Could not find this route", 404);
  throw error;
});

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
