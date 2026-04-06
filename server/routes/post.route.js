const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { createPost } = require('../controllers/post.controller');
const router = express.Router();

router.post('/createpost', verifyToken, createPost);

module.exports = router;