const express = require('express');

const client = require('../../db');
const router = express.Router();
const middleware = require('../middleware/auth');
require('dotenv').config();

// console.log(process.env.PRIVATE_KEY);
router.post('/signup',middleware.signup);

router.post('/login', middleware.login);

router.get('/verifyJWT',middleware.verifyJWT);

module.exports = router;