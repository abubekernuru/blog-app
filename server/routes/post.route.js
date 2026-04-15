const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { createPost, getPosts, deletePost, updatePost} = require('../controllers/post.controller.js');
const router = express.Router();

router.post('/createpost', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);

module.exports = router;