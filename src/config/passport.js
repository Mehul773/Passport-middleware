const User = require("../models/userModel");
const { Strategy, ExtractJwt } = require("passport-jwt");

const jwtOptions = {
  secretOrKey: "MyJwtSecret",
  jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract from 'Authorization' header as a Bearer token
    ExtractJwt.fromUrlQueryParameter("token"), //Extract token from query parameter 'token'
  ]),
  ignoreExpiration: false,
};

const jwtVerify = async (jwt_payload, callback) => {
  try {
    console.log(`========jwt Payload====> ${JSON.stringify()}`);
    const user = await User.findById(jwt_payload._id);
    console.log(`==========User==========>${user}`);
    if (!user) {
      return callback(null, false);
    }
    callback(null, user);
  } catch (error) {
    callback(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
module.exports = jwtStrategy;
