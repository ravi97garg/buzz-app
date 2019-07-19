const Express = require('express');

const router = Express.Router();
const {
    getUsers
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

module.exports = router;