const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { postComment, getComment } = require('../controllers/comment.controller.js');

const router = express.Router();


router.post('/createcomment', verifyToken, postComment);
router.get('/getcomment/:postId', getComment);

module.exports = router;