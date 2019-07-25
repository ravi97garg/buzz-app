const jwt = require('jsonwebtoken');

const {
    JWT_KEY,
    CLIENT_URL,
    tokenExpirationTime
} = require('../constants');

const generateToken = (req, res) => {
    const {
        email
    } = req.user;
    jwt.sign({'email': email}, JWT_KEY, {expiresIn: tokenExpirationTime},
        (err, token) => {
            if(err){
                res.redirect(`${CLIENT_URL}/authenticationFailed`);
            } else {
                res.redirect(`${CLIENT_URL}/token?q=${token}`);
            }
        });
};


module.exports = {
    generateToken
};