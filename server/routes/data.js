const Express = require('express');
const router = Express.Router();
const buzzRouter = require('./buzz');
const userRouter = require('./user');
const complaintRouter = require('./complaint');
const resolveRouter = require('./resolve');

router.use('/buzz', buzzRouter);
router.use('/user', userRouter);
router.use('/complaint', complaintRouter);
router.use('/resolve', resolveRouter);


module.exports = router;