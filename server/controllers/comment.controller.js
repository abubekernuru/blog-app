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
    const {postId, userId} = req.params;
        if(req.user.id !== userId ){
        return next(errorHandler(403, "You must be signed in to comment on a post!"))
    }
    try {
        const fetchComments = await Comment.find({postId})
            const totalComments = await Post.countDocuments();
        
            const now = new Date();
        
            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            );
            res.status(200).json(fetchComments, totalComments, oneMonthAgo)
    } catch (error) {
        next(error)
    }
}

module.exports = {postComment, getComment}