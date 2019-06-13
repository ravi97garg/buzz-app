const Express = require('express');
const router = Express.Router();
const buzzRouter = require('./buzz');
const userRouter = require('./user');
const complaintRouter = require('./complaint');

router.get('/', (req, res) => {
    res.send('hello');
});

router.use('/buzz', buzzRouter);
router.use('/user', userRouter);
router.use('/complaint', complaintRouter);


module.exports = router;