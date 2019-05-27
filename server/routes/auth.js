const Express = require('express');
const passport = require("passport");
const router = Express.Router();

router.get('/logout', (req, res) => {
    req.logout();
    console.log(`Hello ${req.user}`)
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
        failureRedirect: '/google',
        // successRedirect: '/'
    }),
    function (req, res) {
        res.send(req.user);
    });

module.exports = router;