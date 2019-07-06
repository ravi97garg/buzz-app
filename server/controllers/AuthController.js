const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../constants');

const generateToken = (req, res) => {
    const {
        email
    } = req.user;
    jwt.sign({'email': email}, JWT_KEY, {expiresIn: "10h"},
        (err, token) => {
            if(err){
                res.redirect(`http://localhost:3000/authenticationFailed`);
            } else {
                res.redirect(`http://localhost:3000/token?q=${token}`);
            }
        });
};


module.exports = {
    generateToken
};