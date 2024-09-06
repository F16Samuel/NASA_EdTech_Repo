const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes for authentication
router.post('/pages/login', authController.login);
router.post('/pages/signup', authController.signup);

module.exports = router;
