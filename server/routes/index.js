const Express = require('express');
const {dataRouteMiddleware} = require("../middlewares");
const router = Express.Router();
const authRouter = require('./auth');
const dataRouter = require('./data');
const {authenticateUser, changeUserProfile} = require('../controllers/UserController');

router.use('/auth', authRouter);
router.use('/data', dataRouteMiddleware, dataRouter);

module.exports = router;