const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../models/User")
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
