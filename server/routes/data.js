const Express = require('express');

const buzzRouter = require('./buzz');
const userRouter = require('./user');
const complaintRouter = require('./complaint');
const resolveRouter = require('./resolve');
const superAdminRouter = require('./superadmin');
const {isAdmin, isSuperAdmin} = require('../middlewares');

const router = Express.Router();

router.use('/buzz', buzzRouter);
router.use('/user', userRouter);
router.use('/complaint', complaintRouter);
router.use('/resolve', isAdmin, resolveRouter);
router.use('/superadmin', isSuperAdmin, superAdminRouter);


module.exports = router;