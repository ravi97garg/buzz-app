const {CLIENT_ID, SECRET_KEY} = require("../constants");
const User = require('../models/User');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)

});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
});

passport.use(new GoogleStrategy({
        clientID: CLIENT_ID,
        clientSecret: SECRET_KEY,
        callbackURL: "http://localhost:8080/auth/google/redirect"
    },
    function (accessToken, refreshToken, profile, done) {

        const user = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'User',
            profileImage: profile.photos[0].value,
            department: 'Technology',
            provider: profile.provider,
            [profile.provider]: profile._json
        };
        User.findOneAndUpdate(
            {googleId: profile.id},
            {...user},
            {upsert: true, new: true},
            (err, user) => {
                if(err) {
                    return done(err);
                } else {
                    user.save();
                    return done(null, user);
                }
            }
        );

    }
));

module.exports = passport;