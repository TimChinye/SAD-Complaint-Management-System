const express = require('express');
const passport = require('passport');
const { signJwt } = require('../../services/auth.service');
const db = require('../../utils/db');

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Log in user and return JWT
// @access  Public
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }

    try {
      // Fetch the user's role
      const roleQuery = `
        SELECT r.name FROM roles r
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = $1
      `;
      const { rows } = await db.query(roleQuery, [user.id]);

      if (rows.length === 0) {
        return res.status(403).json({ message: 'User has no assigned role.' });
      }
      const role = rows[0]; // Assuming one role for simplicity in the PoC

      // Sign the JWT
      const token = signJwt(user, role);
      
      return res.json({ token });

    } catch (dbError) {
      return next(dbError);
    }
  })(req, res, next);
});

module.exports = router;