const Express = require('express');

const authRouter = require('./auth');
const dataRouter = require('./data');
const { dataRouteMiddleware } = require("../middlewares");
const initiateMongo = require('../models');

const router = Express.Router();

router.use('/auth', initiateMongo, authRouter);
router.use('/data', initiateMongo, dataRouteMiddleware, dataRouter);

module.exports = router;