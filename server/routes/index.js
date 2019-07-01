const Express = require('express');
const {dataRouteMiddleware} = require("../middlewares");
const router = Express.Router();
const {multerUploads} = require("../config/multer.config");
const {authenticateUser, changeUserProfile} = require('../controllers');

router.post('/authenticate',
    authenticateUser
);

router.post('/changeProfile',
    dataRouteMiddleware,
    multerUploads,
    changeUserProfile
);

module.exports = router;