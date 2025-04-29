// routes/authRoutes.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start Google login
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Handle Google OAuth callback
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // Successful login
  }
);

// Logout route
router.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
