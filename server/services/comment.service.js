const Comment = require('../models/Comment');

const createComment = (comment, commentBy, commentPostId) => {
    const newComment = new Comment();
    newComment.comment = comment;
    newComment.author = commentBy;
    newComment.postId = commentPostId;
    return newComment.save();
};


module.exports = {
    createComment
};