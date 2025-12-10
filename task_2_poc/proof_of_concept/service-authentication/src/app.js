const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./api/routes/auth.routes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors());         // Enable Cross-Origin Resource Sharing

// Passport middleware
app.use(passport.initialize());
require('./config/passport.config')(passport); // Pass passport to config file

// Define Routes
app.use('/api/auth', authRoutes);

// Simple health check route
app.get('/health', (req, res) => {
    res.status(200).send('Authentication service is healthy.');
});

// Error handling middleware (optional but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = app;