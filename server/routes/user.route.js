const express = require('express');
const router = express.Router();
const { test, generateSignature } = require('../controllers/user.controller');

// test api route
router.get('/test', test)
router.get('/sign-image', generateSignature)

module.exports = router;


