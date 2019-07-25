const Express = require('express');

const router = Express.Router();
const {
    getUsers,
    changeUserStatus
} = require('../controllers/SuperAdminController');

router.get('/getUsers', (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.status(401).send({message: 'Not Authenticated to access this route'});
        }
    },
    getUsers
);

router.get('/changeUserStatus/:userId', (req, res, next) => {
        const {
            userId
        } = req.params;
        const {
            status
        } = req.query;
        if (userId && status) {
            next()
        } else {
            res.status(401).send({message: 'Not Authenticated to access this route'});
        }
    },
    changeUserStatus
);

module.exports = router;