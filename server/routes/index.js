const Express = require('express');

const authRouter = require('./auth');
const dataRouter = require('./data');
const { dataRouteMiddleware } = require("../middlewares");

const router = Express.Router();

router.use('/auth', authRouter);
router.use('/data', dataRouteMiddleware, dataRouter);

module.exports = router;