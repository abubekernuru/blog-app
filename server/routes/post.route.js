const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { createPost, getPosts } = require('../controllers/post.controller.js');
const router = express.Router();

router.post('/createpost', verifyToken, createPost);
router.get('/getposts', getPosts);

module.exports = router;