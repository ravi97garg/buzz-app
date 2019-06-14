const Express = require('express');
const {postReactionService, createReactionService, updateReactionService, deleteReactionService} = require("../services/reaction.service");
const {createBuzzService, getInitialBuzzService, getCommentService, getReactionService, getMoreBuzzService, getNewBuzzs} = require("../services/buzz.service");
const router = Express.Router();
const {multerUploads, dataUri} = require('../config/multer.config');
const {uploader} = require('../config/cloudinary.config');

// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

router.post('/createBuzz', multerUploads, (req, res) => {
    try {
        // console.log(`request: `,req.headers);
        req.body.postedBy = req.userId;
        console.log(`new Buzz  ${JSON.stringify(req.body)}`);
        // console.log(`files  ${JSON.stringify(req.files)} ${JSON.stringify(req.file)}`);
        if(req.files){
            console.log(`hello ${Array.isArray(req.files)}`);
            let uploaderPromises = [];
            console.log(req.files.length);
            req.files.forEach((file) => {
                let base64file = dataUri(file).content;
                console.log(`base64file`);
                uploaderPromises.push(uploader.upload(base64file));
            });
            Promise.all(uploaderPromises).then((result) => {
                req.body.images = result.map((file) => { return file.secure_url});
                console.log(req.body.images)
                createBuzzService(req.body).then(() => {
                    getNewBuzzs(req.body.startTime).then((buzzs) => {
                        var reactionPromises = [];
                        buzzs.forEach(item=>{
                            reactionPromises.push(getReactionService(item._id));
                        });
                        Promise.all(reactionPromises).then((result) => {
                            let extractedBuzzs = buzzs.map((item, index) => {
                                item._doc['reactions'] = result[index];
                                return item;
                            });
                            res.send({message: 'OK', status: 1, extractedBuzzs});
                        });

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
    buzzs.forEach(item=>{
        reactionPromises.push(getReactionService(item._id));
    });
    var buzzsWithReactions = await Promise.all(reactionPromises); //Promise.all([...reactionPromises]);
    let tempBuzzs = buzzs;
    buzzs = tempBuzzs.map((item, index) => {
        item._doc['reactions'] = buzzsWithReactions[index]
        return item;
    });
    res.send({extractedBuzzs: buzzs, status: 1})
});

router.post('/getMoreBuzz', (req, res) => {
    const {limit, endTime} = req.body;
    var extractedBuzzs = [];
    getMoreBuzzService(limit, endTime).then((buzzs) => {
        extractedBuzzs = buzzs;
        buzzs.forEach((buzz, index) => {
            getReactionService(buzz._id).then((res1) => {
                extractedBuzzs[index].reactions = res1;
            }).catch((err) => console.error(err));
            getCommentService(buzz._id).then((res) => {
                extractedBuzzs[index].comments = res;
            });
        });
        res.send({extractedBuzzs, status: 1});
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
})

module.exports = router;