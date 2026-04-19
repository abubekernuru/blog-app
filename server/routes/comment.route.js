const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { postComment, getComment, likeComment, editComment, deleteComment, getComments } = require('../controllers/comment.controller.js');

const router = express.Router();


router.post('/createcomment', verifyToken, postComment);
router.get('/getcomment/:postId', getComment);
router.get('/getcomments', getComments);
router.put('/editcomment/:commentId', verifyToken, editComment);
router.delete('/deletecomment/:commentId', verifyToken, deleteComment);
router.put('/likecomment/:commentId', verifyToken, likeComment);

module.exports = router;