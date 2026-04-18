const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { postComment, getComment, likeComment } = require('../controllers/comment.controller.js');

const router = express.Router();


router.post('/createcomment', verifyToken, postComment);
router.get('/getcomment/:postId', getComment);
router.put('/likecomment/:commentId', verifyToken, likeComment);

module.exports = router;