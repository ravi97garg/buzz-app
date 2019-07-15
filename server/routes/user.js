const Express = require('express');

const {changeUserProfile} = require("../controllers/UserController");
const {findUserByID} = require('../services/user.service');
const {multerUploads} = require("../config/multer.config");

const router = Express.Router();

router.get('/:id', (req, res) => {
    findUserByID(req.params.id).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(400).send({message: err, status: 2})
    });
});

router.post('/changeProfile',
    multerUploads,
    (req, res, next) => {
        if (req.files[0]) {
            next();
        } else {
            res.status(400).send();
        }
    },
    changeUserProfile
);

module.exports = router;