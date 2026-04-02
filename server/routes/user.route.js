const express = require('express');
const router = express.Router();
const { test, generateSignature, updateUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/verifyToken.js');

// test api route
router.get('/test', test)
router.get('/sign-image', generateSignature)
router.put('/update/:userId', verifyToken, updateUser)

module.exports = router;


