// routes/authRoute.js
const express = require('express');
const { register, login, getAuthUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
