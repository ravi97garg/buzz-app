const {createCommentService} = require("../services/comment.service");

const postComment = (req, res) => {
    const {buzzId, comment} = req.body;
    createCommentService(comment, req.userId, buzzId).then((insertedComment) => {
        Comment.populate(insertedComment, {path:"commentBy"}, function(err, populatedComment) {
            if(err){
                res.send({message: 'DBError', status: 2});
            } else {
                res.send({comment: populatedComment, status: 1});
            }
        });
    }).catch((err) => {
        console.error(err);
        res.status(400).send({message: 'DBError', status: 2});
    })
};

module.exports = {
    postComment
};