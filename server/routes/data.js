const Express = require('express');
const router = Express.Router();
const buzzRouter = require('./buzz');
const userRouter = require('./user');

router.get('/', (req, res) => {
    res.send('hello');
});

router.use('/buzz', buzzRouter);
router.use('/user', userRouter);

module.exports = router;