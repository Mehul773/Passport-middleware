const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // console.log(`----------user--->`,user);
    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email or password incorrect" });
    }
    const token = user.generateAuthToken();
    console.log(jwt.verify(token,'MyJwtSecret'));    
    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    //   console.log(user_id);

    // const token = req.headers.authorization.split(" ")[1];
    // console.log("token===", token);
    // const verifyToken = await jwt.verify(token, "MyJwtSecret");
    // console.log("verifyToken===", verifyToken);
    
    const user = await User.findById(user_id);
    // console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
module.exports = { signUp, login, getUsers, getUser };
