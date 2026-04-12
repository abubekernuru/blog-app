const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { createPost, getPosts, deletepost } = require('../controllers/post.controller.js');
const router = express.Router();

router.post('/createpost', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId', verifyToken, deletepost);

module.exports = router;