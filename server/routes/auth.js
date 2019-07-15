const Express = require('express');
const passport = require("passport");

const {authenticateUser} = require("../controllers/UserController");
const {generateToken} = require("../controllers/AuthController");
const {USER_INFO} = require("../constants");

const router = Express.Router();

router.get('/google', passport.authenticate('google',
    {
        scope: [
            USER_INFO.PROFILE,
            USER_INFO.EMAIL,
        ],
    })
);

router.get('/google/redirect',
    passport.authenticate('google', {
        failureRedirect: '/google',
        failureFlash: true
    }), generateToken);

router.get('/authenticate/:token',
    (req, res, next) => {
        if (req.params.token) {
            next();
        } else {
            res.status(401).send()
        }
    }, authenticateUser);

module.exports = router;