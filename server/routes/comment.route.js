const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const { postComment } = require('../controllers/comment.controller.js');

const router = express.Router();


router.post('/createcomment/:postId', verifyToken, postComment)

module.exports = router;