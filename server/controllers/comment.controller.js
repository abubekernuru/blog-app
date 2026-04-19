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

const getComments = async (req, res, next)=> {
    const {postId} = req.params;
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const fetchComments = await Comment.find()
            .sort({createdAt: -1})
            .skip(startIndex)
            .limit(limit)
            res.status(200).json(fetchComments)
    } catch (error) {
        next(error)
    }
}

const likeComment = async (req, res, next) => {
    try {
        const {commentId} = req.params;
        const comment = await Comment.findById(commentId);

            if (!comment) {
                return next(errorHandler(404, 'Comment not found'));
            }
            const userIndex = comment.likes.indexOf(req.user.id);

            if(userIndex === -1){
                comment.likes.push(req.user.id);
                comment.numberOfLikes = comment.likes.length;
            }else{
                comment.likes.splice(userIndex, 1);
                comment.numberOfLikes = comment.likes.length;
            }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }
}

const editComment = async (req, res, next) => {
    try {
        const {commentId} = req.params;
        const commentToEdit = await Comment.findById(commentId);

        if (!commentToEdit) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const isOwner = commentToEdit.userId === req.user.id;
        const isAdmin = req.user.isAdmin;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: "You are not allowed to edit this comment" });
        }
        const comment = await Comment.findByIdAndUpdate(commentId, {
            $set:{
                comment: req.body.comment
            }
        }, {new: true});
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next)=>{
    try {    
        const {commentId} = req.params;
            const commentToDelete = await Comment.findById(commentId);
    
            if (!commentToDelete) {
                return res.status(404).json({ message: "Comment not found" });
            }
            const isOwner = commentToDelete.userId === req.user.id;
            const isAdmin = req.user.isAdmin;
    
            if (!isOwner && !isAdmin) {
                return res.status(403).json({ message: "You are not allowed to delete this comment" });
            }
            await Comment.findByIdAndDelete(commentId);
            res.status(200).json({ message: "Comment deleted successfully!" })
    } catch (error) {
        next(error);
    }
}

module.exports = {postComment, getComment, likeComment, editComment, deleteComment, getComments}