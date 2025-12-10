const userService = require('../services/user.service');

const createTenant = async (req, res, next) => {
  const { companyName, managerName, managerEmail } = req.body;

  if (!companyName || !managerName || !managerEmail) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const result = await userService.onboardTenant(companyName, managerName, managerEmail);
    res.status(201).json(result);
  } catch (err) {
    // Check for unique constraint violation (e.g., email already exists)
    if (err.code === '23505') {
        return res.status(409).json({ message: 'A user with this email already exists.' });
    }
    next(err);
  }
};

const reset = async (req, res, next) => {
  // In a real app, you would check if process.env.NODE_ENV is 'development'
  try {
    const result = await userService.resetDatabase();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTenant,
  reset
};