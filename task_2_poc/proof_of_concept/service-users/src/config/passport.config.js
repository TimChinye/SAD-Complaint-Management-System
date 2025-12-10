const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const options = {
  // This tells the strategy where to look for the JWT.
  // We're looking in the "Authorization" header for a "Bearer" token.
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  
  // This is the secret key that will be used to verify the token's signature.
  // It MUST be the same secret used in the service-authentication to sign the token.
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = function(passport) {
  // This is where we register the "jwt" strategy.
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // This function is the "verify callback".
    // It runs ONLY after Passport has successfully verified the JWT's signature and expiration.
    // The 'jwt_payload' is the decoded content of the token (e.g., { sub, email, role, tenantId }).

    // We don't need to check the database here because we trust the token.
    // We simply pass the payload to the next step.
    // Passport will attach this payload to the request object as 'req.user'.
    return done(null, jwt_payload);
  }));
};