const async = require('async');

const {dataUri} = require("../config/multer.config");
const {uploader} = require("../config/cloudinary.config");

const {
    updateBuzzContent,
    getBuzzByID,
    getMoreBuzz,
    getComment,
    getInitialBuzz,
    getReaction,
    getNewBuzzs,
    createBuzz
} = require("../services/buzz.service");
const {
    msgToBuzzCreator,
    msgToBuzzReporter
} = require("../mailTemplates/buzz/reportBuzzEventMail");

const createNewBuzz = (req, res) => {
    try {
        req.body.images = [];
        async.forEachOf(req.files, async (file) => {
            let image = await uploader.upload(dataUri(file).content);
            req.body.images.push(image.secure_url);
        }).then(() => {
            createBuzz(req.body).then(() => {
                getNewBuzzs(req.body.startTime).then(async (buzzs) => {
                    let copyBuzz = buzzs;
                    async.forEachOf(buzzs, async (item, index) => {
                        copyBuzz[index]._doc['reactions'] = await getReaction(item._id);
                        copyBuzz[index]._doc['comments'] = await getComment(item._id);
                    })
                        .then(() => {
                            res.send({message: 'OK', status: 1, extractedBuzzs: copyBuzz});
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(400).send({message: err, status: 2});
                        })
                })
            })
                .catch((err) => {
                    console.error(err);
                    res.status(400).send({message: err, status: 2});
                })
        })
            .catch((err) => {
                console.error(err);
                res.status(400).send({message: err, status: 2});
            })
    } catch (err) {
        console.error(err);
        res.status(400).send({message: err, status: 2});
    }
};

const getBuzzs = async (req, res) => {
    try {
        const {limit, endTime} = req.query;
        let buzzs = [];
        if (endTime) {
            buzzs = await getMoreBuzz(+limit, new Date(endTime));
        } else {
            buzzs = await getInitialBuzz(+limit);
        }
        let copyBuzz = buzzs;
        async.forEachOf(buzzs, async (item, index) => {
            copyBuzz[index]._doc['reactions'] = await getReaction(item._id);
            copyBuzz[index]._doc['comments'] = await getComment(item._id);
        })
            .then(() => {
                res.send({message: 'OK', status: 1, extractedBuzzs: copyBuzz});
            })
            .catch((err) => {
                console.error(err);
                res.status(400).send({message: err, status: 2});
            })
    } catch (err) {
        res.status(400).send({message: err, status: 2});
    }
};

const updateBuzz = (req, res) => {
    const {
        buzzId,
        buzzContent
    } = req.body;
    updateBuzzContent(buzzId, buzzContent).then(() => {
        res.send({message: 'OK', status: 1})
    }).catch((err) => {
        res.status(400).send({message: err, status: 2});
    })
};

const reportBuzz = async (req, res) => {
    const {
        buzzId,
    } = req.body;
    const buzzer = await getBuzzByID(buzzId);
    const {
        buzzer: {
            postedBy: {
                email: buzzerMail,
                name: buzzerName
            }
        }
    } = buzzer;
    const {
        user: {
            email: reporterEmail,
            name: reporterName
        }
    } = req;

    msgToBuzzCreator(
        buzzerMail,
        reporterEmail,
        buzzerName,
        buzzId,
        reporterName
    );
    msgToBuzzReporter(
        reporterEmail,
        buzzerMail,
        buzzId,
        reporterName
    );
    res.send({message: 'OK', status: 1});
};

module.exports = {
    createNewBuzz,
    getBuzzs,
    updateBuzz,
    reportBuzz
};