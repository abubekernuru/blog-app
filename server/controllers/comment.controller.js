const Comment = require("../model/comment.model");
const errorHandler = require("../utils/error")




const postComment = async (req, res, next )=> {
    const {comment, userId, postId} = req.body;

    if(req.user.id !== userId ){
        return next(errorHandler(403, "You must be signed in to comment on a post!"))
    }

    if (!comment || comment.trim() === '') {
        return next(errorHandler(400, "Comment cannot be empty"));
    }

    try {
        const newComment = new Comment({
            postId,
            comment,
            userId
        })
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        next(error)
    }
}

const getComment = async (req, res, next)=> {
    const {postId} = req.params;
    try {
        const fetchComments = await Comment.find({postId}).sort({createdAt: -1})
            res.status(200).json(fetchComments)
    } catch (error) {
        next(error)
    }
}

module.exports = {postComment, getComment}