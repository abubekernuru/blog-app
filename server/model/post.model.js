const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    }, 
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    category: {
        type: String,
        default: 'uncategorized'
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;