const Express = require('express');
const passport = require("passport");
const router = Express.Router();
const {authenticateUser} = require("../controllers/UserController");
const {generateToken} = require("../controllers/AuthController");

router.get('/logout', (req, res) => {
    console.log(`Hello ${req.user}`);
    res.send(req.user)
});

router.get('/google', passport.authenticate('google',
    {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    }
    )
);

router.get('/google/redirect',
    passport.authenticate('google', {
        // failureRedirect: '/google',
        failureRedirect: 'http://localhost:3000/authenticationFailed',
        failureFlash: true
    }),
    generateToken);

router.get('/authenticate/:token',
    (req, res, next) => {
        if (req.params.token) {
            next();
        } else {
            res.status(401).send()
        }
    }, authenticateUser
);

module.exports = router;