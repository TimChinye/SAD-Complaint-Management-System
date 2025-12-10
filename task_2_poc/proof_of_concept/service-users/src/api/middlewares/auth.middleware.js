const passport = require('passport');

// This middleware authenticates using JWT and ensures a user is logged in.
const authenticate = passport.authenticate('jwt', { session: false });

// This middleware checks if the authenticated user has a specific role.
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }
  };
};

module.exports = {
  authenticate,
  requireRole,
};