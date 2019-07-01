const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../constants');

const generateToken = (req, res) => {
    jwt.sign(req.user.toJSON(), JWT_KEY, {expiresIn: "10h"},
        (err, token) => {
            if(err){
                res.status(400).redirect(`http://localhost:3000/authenticationFailed`);
            } else {
                res.redirect(`http://localhost:3000/token?q=${token}`);
            }
        });
};

const logOutUser = (req, res) => {
};

module.exports = {
    generateToken,
    logOutUser
};