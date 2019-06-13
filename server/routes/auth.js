const Express = require('express');
const passport = require("passport");
const router = Express.Router();
const jwt = require('jsonwebtoken');
const JWT_KEY =  require('../constants').JWT_KEY;

router.get('/logout', (req, res) => {
    // req.logout();
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
        failureRedirect: '/google',
        // successRedirect: '/'
    }),
    function (req, res) {
        jwt.sign(req.user.toJSON(), JWT_KEY, {expiresIn: "10h"},
            function(err, token) {
                if(err){
                    console.error(`err: ${err}`);
                } else {
                    console.log(`token: ${token}`);
                }
                res.redirect(`http://localhost:3000/token?q=${token}`);
        });
    });



module.exports = router;