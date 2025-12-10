const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = function(passport) {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // The payload is the decoded JWT.
    // We trust it because the signature has already been verified by the strategy.
    // We can attach it to the request for our route handlers to use.
    return done(null, jwt_payload);
  }));
};