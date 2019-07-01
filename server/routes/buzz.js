const Express = require('express');
const router = Express.Router();
const {multerUploads} = require('../config/multer.config');
const {postComment} = require("../controllers/CommentController");
const {postReaction} = require("../controllers/ReactionController");
const {
    createNewBuzz,
    getInitialBuzzs,
    getMoreBuzzs,
    updateBuzz,
    reportBuzz
} = require("../controllers/BuzzController");

router.post('/createBuzz',
    multerUploads,
    createNewBuzz
);

router.post('/getInitialBuzz',
    getInitialBuzzs
);

router.post('/getMoreBuzz',
    getMoreBuzzs
);

router.post('/postReaction',
    postReaction
);

router.post('/postComment',
    postComment
);

router.post('/updateBuzz',
    updateBuzz
);

router.post('/report',
    reportBuzz
);

module.exports = router;