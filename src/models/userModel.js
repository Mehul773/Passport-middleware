const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function (next) {
  try {
    return jwt.sign({ _id: this._id }, "MyJwtSecret", {
      expiresIn: "30 minutes",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      console.log(`Hased password  =========> ${this.password}`);
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
