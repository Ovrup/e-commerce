const express = require('express');
const { createUser, login } = require('../controller/user')

const router = express.Router();

// User Sign up API
router.post('/signup', createUser);
router.post('/login', login);


module.exports = router;