const Express = require('express');
const passport = require("passport");
const router = Express.Router();

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
        failureRedirect: '/login',
        // successRedirect: '/'
    }),
    function (req, res) {
        res.send(req.user);
    });

module.exports = router;