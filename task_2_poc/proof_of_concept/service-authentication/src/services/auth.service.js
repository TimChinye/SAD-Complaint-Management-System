const jwt = require('jsonwebtoken');
require('dotenv').config();

const signJwt = (user, role) => {
  const payload = {
    sub: user.id, // 'sub' (subject) is a standard JWT claim for the user ID
    email: user.email,
    tenantId: user.tenant_id,
    role: role.name,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  // Token expires in 15 minutes
  return jwt.sign(payload, secret, { expiresIn: '15m' });
};

module.exports = {
  signJwt,
};