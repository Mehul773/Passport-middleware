const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {
  signUp,
  login,
  getUsers,
  getUser,
} = require("./src/controller/userController");
const { auth } = require("./src/middleware.js/index");

const passport = require("passport");
const jwtStrategy = require("./src/config/passport");

dotenv.config();

const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.post("/signup", signUp);
app.post("/login", login);
app.get("/users", getUsers);
app.get("/user/:id", auth(), getUser);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`MongoDB connected...`);
  })
  .catch((e) => console.log(e));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
