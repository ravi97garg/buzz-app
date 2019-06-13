const {CLIENT_ID, SECRET_KEY} = require("../constants");
const User = require('../models/User');
const Role = require('../models/Roles');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
            profileImage: profile.photos[0].value,
            provider: profile.provider,
            [profile.provider]: profile._json
        };

        Role.findOne({email: profile.emails[0].value}, (err, adminUser) => {
            if(err) {
                console.error(err);
            } else {
                console.log(`userrrrrrrrr ${JSON.stringify(user)}`);
                user.department = adminUser ? adminUser.department: 'IT';
                user.role = adminUser ? adminUser.role : 'User';
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
        });

    }
));

module.exports = passport;