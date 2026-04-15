const Comment = require("../model/comment.model");
const errorHandler = require("../utils/error")




const postComment = async (req, res, next )=> {
    const {postId} = req.params;
    const {comment} = req.body;

    if(!req.user){
        return next(errorHandler(403, "You must be signed in to comment on a post!"))
    }

    if (!comment || comment.trim() === '') {
        return next(errorHandler(400, "Comment cannot be empty"));
    }

    try {
        const newComment = new Comment({
            postId,
            comment,
            userId: req.user.id
        })
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        next(error)
    }
}

module.exports = {postComment}