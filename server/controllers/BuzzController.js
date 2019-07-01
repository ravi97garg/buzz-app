const {updateBuzzContentService} = require("../services/buzz.service");
const {getBuzzByID} = require("../services/buzz.service");
const {getMoreBuzzService} = require("../services/buzz.service");
const {getCommentService} = require("../services/buzz.service");
const {getInitialBuzzService} = require("../services/buzz.service");
const {getReactionService} = require("../services/buzz.service");
const {getNewBuzzs} = require("../services/buzz.service");
const {createBuzzService} = require("../services/buzz.service");
const {dataUri} = require("../config/multer.config");
const {uploader} = require("../config/cloudinary.config");
const {sgMail} = require('../config/sendgrid.config');

const createNewBuzz = (req, res) => {
    try {
        req.body.postedBy = req.userId;
        if (req.files) {
            let uploaderPromises = [];
            req.files.forEach((file) => {
                uploaderPromises.push(uploader.upload(dataUri(file).content));
            });
            Promise.all(uploaderPromises).then((result) => {
                req.body.images = result.map((file) => {
                    return file.secure_url
                });
                createBuzzService(req.body).then(() => {
                    getNewBuzzs(req.body.startTime).then(async (buzzs) => {
                        const reactionPromises = [];
                        const commentPromises = [];
                        buzzs.forEach(item => {
                            reactionPromises.push(getReactionService(item._id));
                            commentPromises.push(getCommentService(item._id));
                        });
                        let buzzsWithReactions = await Promise.all(reactionPromises); //Promise.all([...reactionPromises]);
                        let buzzsWithComments = await Promise.all(commentPromises);
                        let tempBuzzs = buzzs;
                        buzzs = tempBuzzs.map((item, index) => {
                            item._doc['reactions'] = buzzsWithReactions[index];
                            item._doc['comments'] = buzzsWithComments[index];
                            return item;
                        });
                        res.send({message: 'OK', status: 1, extractedBuzzs: buzzs})
                    })
                }).catch(() => {
                    res.status(400).send({message: 'DBError', status: 2});
                })
            }).catch((err) => {
                console.error(err);
                res.status(400).send({message: 'DBError', status: 2});
            });

        }

    } catch (e) {
        console.error(e);
        res.status(400).send({message: 'DBError', status: 2});
    }
};

const getInitialBuzzs = async (req, res) => {
    try {
        const {limit} = req.body;
        let buzzs = await getInitialBuzzService(limit);
        const reactionPromises = [];
        const commentPromises = [];
        buzzs.forEach(item => {
            reactionPromises.push(getReactionService(item._id));
            commentPromises.push(getCommentService(item._id));
        });
        const buzzsWithReactions = await Promise.all(reactionPromises); //Promise.all([...reactionPromises]);
        const buzzsWithComments = await Promise.all(commentPromises);
        let tempBuzzs = buzzs;
        buzzs = tempBuzzs.map((item, index) => {
            item._doc['reactions'] = buzzsWithReactions[index];
            item._doc['comments'] = buzzsWithComments[index];
            return item;
        });
        res.send({extractedBuzzs: buzzs, status: 1})
    } catch (e) {
        console.error(e);
        res.status(400).send({message: 'DBError', status: 2});
    }
};

const getMoreBuzzs = (req, res) => {
    const {limit, endTime} = req.body;
    let extractedBuzzs = [];
    getMoreBuzzService(limit, endTime).then(async (buzzs) => {
        extractedBuzzs = buzzs;
        const reactionPromises = [];
        const commentPromises = [];
        buzzs.forEach(item=>{
            reactionPromises.push(getReactionService(item._id));
            commentPromises.push(getCommentService(item._id));
        });
        const buzzsWithReactions = await Promise.all(reactionPromises); //Promise.all([...reactionPromises]);
        const buzzsWithComments = await Promise.all(commentPromises);
        let tempBuzzs = buzzs;
        buzzs = tempBuzzs.map((item, index) => {
            item._doc['reactions'] = buzzsWithReactions[index];
            item._doc['comments'] = buzzsWithComments[index];
            return item;
        });
        res.send({extractedBuzzs: buzzs, status: 1});
    }).catch((err) => {
        console.error(err);
        res.status(400).send({message: 'DBError', status: 2});
    });
};

const updateBuzz = (req, res) => {
    const {
        buzzId,
        buzzContent
    } = req.body;
    updateBuzzContentService(buzzId, buzzContent).then(() => {
        res.send({message: 'OK', status: 1})
    }).catch((err) => {
        console.error(err);
        res.status(400).send({message: 'DBError', status: 2});
    })
};

const reportBuzz = async (req, res) => {
    const {
        buzzId,
    } = req.body;
    const buzzer = await getBuzzByID(buzzId);
    const msgToBuzzer = {
        to: buzzer.postedBy.email,
        from: req.user.email,
        subject: `Your Buzz is reported`,
        html: `Hi <strong>${buzzer.postedBy.name}</strong>, <br/>Your Buzz #${buzzId} is reported by <strong>${req.user.name}</strong>.`,
    };
    sgMail.send(msgToBuzzer);
    res.send({message: 'OK', status: 1});
};

module.exports = {
    createNewBuzz,
    getInitialBuzzs,
    getMoreBuzzs,
    updateBuzz,
    reportBuzz
};