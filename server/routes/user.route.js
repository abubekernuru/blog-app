const express = require('express');
const router = express.Router();
const { test, generateSignature, updateUser, deleteUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/verifyToken.js');

// test api route
router.get('/test', test)
router.get('/sign-image', generateSignature)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)

module.exports = router;


