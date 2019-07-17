const Comment = require("../models/Comment");

const {
    createComment
} = require("../services/comment.service");

const postComment = (req, res) => {
    const {
        buzzId,
        comment
    } = req.body;
    createComment(comment, req.userId, buzzId)
        .then((insertedComment) => {
            Comment.populate(insertedComment, {path: "author"}, (err, populatedComment) => {
                if (err) {
                    res.send({message: err});
                } else {
                    res.send({comment: populatedComment});
                }
            });
        })
        .catch((err) => {
            res.status(500).send({message: err});
        })
};

module.exports = {
    postComment
};