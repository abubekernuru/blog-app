const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { test } = userController;
// const authMiddleware = require('../middlewares/auth.middleware');

// test api route
router.get('/test', test)

module.exports = router;


