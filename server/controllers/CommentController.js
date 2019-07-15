const Comment = require("../models/Comment");

const {
    createComment
} = require("../services/comment.service");

const postComment = (req, res) => {
    const {
        buzzId,
        comment
    } = req.body;
    createComment(comment, req.userId, buzzId).then((insertedComment) => {
        Comment.populate(insertedComment, {path: "commentBy"}, (err, populatedComment) => {
            if (err) {
                res.send({message: err, status: 2});
            } else {
                res.send({comment: populatedComment, status: 1});
            }
        });
    }).catch((err) => {
        res.status(400).send({message: err, status: 2});
    })
};

module.exports = {
    postComment
};