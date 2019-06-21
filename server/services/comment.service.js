const Comment = require('../models/Comment');

const createCommentService = (comment, commentBy, commentPostId) => {
    const newComment = new Comment();
    newComment.comment = comment;
    newComment.commentBy = commentBy;
    newComment.commentPostId = commentPostId;
    return newComment.save();
};


module.exports = {
    createCommentService
};