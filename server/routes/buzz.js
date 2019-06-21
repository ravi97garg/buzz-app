const Express = require('express');
const {postReactionService, createReactionService, updateReactionService, deleteReactionService} = require("../services/reaction.service");
const {createBuzzService, getInitialBuzzService, getCommentService, getReactionService, getMoreBuzzService, getNewBuzzs} = require("../services/buzz.service");
const router = Express.Router();
const {multerUploads, dataUri} = require('../config/multer.config');
const {uploader} = require('../config/cloudinary.config');
const {createCommentService} = require('../services/comment.service');
const Comment = require('../models/Comment');

router.post('/createBuzz', multerUploads, (req, res) => {
    try {
        req.body.postedBy = req.userId;
        if(req.files){
            let uploaderPromises = [];
            req.files.forEach((file) => {
                let base64file = dataUri(file).content;
                uploaderPromises.push(uploader.upload(base64file));
            });
            Promise.all(uploaderPromises).then((result) => {
                req.body.images = result.map((file) => { return file.secure_url});
                createBuzzService(req.body).then(() => {
                    getNewBuzzs(req.body.startTime).then(async (buzzs) => {
                        var reactionPromises = [];
                        var commentPromises = [];
                        buzzs.forEach(item=>{
                            reactionPromises.push(getReactionService(item._id));
                            commentPromises.push(getCommentService(item._id));
                        });
                        var buzzsWithReactions = await Promise.all(reactionPromises); //Promise.all([...reactionPromises]);
                        var buzzsWithComments = await Promise.all(commentPromises);
                        let tempBuzzs = buzzs;
                        buzzs = tempBuzzs.map((item, index) => {
                            item._doc['reactions'] = buzzsWithReactions[index];
                            item._doc['comments'] = buzzsWithComments[index];
                            return item;
                        });
                        res.send({message: 'OK', status: 1, extractedBuzzs: buzzs})
                    })
                }).catch(() => {
                    res.send({message: 'DBError', status: 2});
                })
            }).catch((err) => {
                console.error(err);
            });

    }

    } catch (e) {
        console.error(e);
        res.send(e);
    }
});

router.post('/getInitialBuzz', async (req, res) => {

    // do this again
    const {limit} = req.body;
    var buzzs = await getInitialBuzzService(limit);
    var reactionPromises = [];
    var commentPromises = [];
    buzzs.forEach(item=>{
        reactionPromises.push(getReactionService(item._id));
        commentPromises.push(getCommentService(item._id));
    });
    var buzzsWithReactions = await Promise.all(reactionPromises); //Promise.all([...reactionPromises]);
    var buzzsWithComments = await Promise.all(commentPromises);
    let tempBuzzs = buzzs;
    buzzs = tempBuzzs.map((item, index) => {
        item._doc['reactions'] = buzzsWithReactions[index];
        item._doc['comments'] = buzzsWithComments[index];
        return item;
    });
    res.send({extractedBuzzs: buzzs, status: 1})
});

router.post('/getMoreBuzz', (req, res) => {
    const {limit, endTime} = req.body;
    var extractedBuzzs = [];
    getMoreBuzzService(limit, endTime).then(async (buzzs) => {
        extractedBuzzs = buzzs;
        var reactionPromises = [];
        var commentPromises = [];
        buzzs.forEach(item=>{
            reactionPromises.push(getReactionService(item._id));
            commentPromises.push(getCommentService(item._id));
        });
        var buzzsWithReactions = await Promise.all(reactionPromises); //Promise.all([...reactionPromises]);
        var buzzsWithComments = await Promise.all(commentPromises);
        let tempBuzzs = buzzs;
        buzzs = tempBuzzs.map((item, index) => {
            item._doc['reactions'] = buzzsWithReactions[index];
            item._doc['comments'] = buzzsWithComments[index];
            return item;
        });
        res.send({extractedBuzzs: buzzs, status: 1});
    }).catch((err) => {
        console.error(err);
        res.send({message: 'DBError', status: 2});
    });
});

router.post('/postReaction', (req, res) => {
    const {buzzId, reactionType} = req.body;
    postReactionService({reactionPostId: buzzId, reactedBy: req.userId})
        .then((reactionObj) => {
            if (reactionObj) {
                if (reactionObj.reactionType === reactionType) {
                    deleteReactionService(reactionObj._id)
                        .then(() => res.send({
                                message: 'Reaction deleted', status: 1, action: -1, reactionObj
                            }
                        ))
                        .catch(err => console.error(err));
                } else {
                    updateReactionService(reactionObj._id, reactionType)
                        .then(() => res.send({
                                message: 'Reaction updated', status: 1, action: 0, reactionObj
                            }
                        ))
                        .catch(err => console.error(err));
                }
            } else {
                createReactionService({reactionPostId: buzzId, reactedBy: req.userId, reactionType})
                    .then((reactionObj) => res.send({
                            message: 'Reaction created', status: 1, action: 1, reactionObj
                        }
                    ))
                    .catch(err => console.error(err));
            }
        })
});

router.post('/postComment', (req, res) => {
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
    })
});

module.exports = router;