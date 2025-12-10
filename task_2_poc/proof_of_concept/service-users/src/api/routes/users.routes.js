const express = require('express');
const { createTenant, reset } = require('../../controllers/user.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

const router = express.Router();

// @route   POST /api/users/tenants
// @desc    Onboard a new tenant and create their default manager
// @access  Private (System Admin only)
router.post('/tenants', authenticate, requireRole('system_admin'), createTenant);

// @route   POST /api/users/reset-db
// @desc    Wipes and re-seeds the database for testing. DEVELOPMENT ONLY.
// @access  Public
router.post('/reset-db', reset);

module.exports = router;