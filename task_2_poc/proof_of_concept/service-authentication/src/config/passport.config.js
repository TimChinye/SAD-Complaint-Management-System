const LocalStrategy = require('passport-local').Strategy;
const db = require('../utils/db');
const argon2 = require('argon2');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (rows.length === 0) {
        return done(null, false, { message: 'No user with that email' });
      }

      const user = rows[0];

      if (await argon2.verify(user.password_hash, password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  }));
};