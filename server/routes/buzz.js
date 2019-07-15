const Express = require('express');

const {multerUploads} = require('../config/multer.config');
const {postComment} = require("../controllers/CommentController");
const {handleReaction} = require("../controllers/ReactionController");
const {
    createNewBuzz,
    getBuzzs,
    updateBuzz,
    reportBuzz
} = require("../controllers/BuzzController");

const router = Express.Router();

router.post('/createBuzz',
    multerUploads,
    (req, res, next) => {
        if (req.files && req.userId) {
            req.body.postedBy = req.userId;
            next()
        } else {
            res.status(400).send();
        }
    },
    createNewBuzz
);

router.get('/getBuzz',
    (req, res, next) => {
        if (req.query.limit) {
            next();
        } else {
            res.status(400).send()
        }
    }
    , getBuzzs
);

router.post('/handleReaction',
    (req, res, next) => {
        const {buzzId, reactionType} = req.body;
        if (buzzId && reactionType && req.userId) {
            next();
        } else {
            res.status(400).send();
        }
    },
    handleReaction
);

router.post('/postComment',
    (req, res, next) => {
        const {buzzId, comment} = req.body;
        if (buzzId && comment && req.userId) {
            next();
        } else {
            res.status(400).send();
        }
    },
    postComment
);

router.post('/updateBuzz',
    (req, res, next) => {
        const {
            buzzId,
            buzzContent
        } = req.body;
        if (buzzId && buzzContent) {
            next();
        } else {
            res.status(400).send();
        }
    },
    updateBuzz
)
;

router.post('/report',
    (req, res, next) => {
        const {
            buzzId,
        } = req.body;
        if (buzzId) {
            next();
        } else {
            res.status(400).send();
        }
    },
    reportBuzz
);

module.exports = router;