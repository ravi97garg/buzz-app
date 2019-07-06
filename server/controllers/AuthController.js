const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../constants');

const generateToken = (req, res) => {
    console.log('heloo', JSON.stringify(req.user));
    const {
        email
    } = req.user;
    console.log(email);
    jwt.sign({'email': email}, JWT_KEY, {expiresIn: "10h"},
        (err, token) => {
            if(err){
                console.log(err);
                res.redirect(`http://localhost:3000/authenticationFailed`);
            } else {
                console.log('yo');
                res.redirect(`http://localhost:3000/token?q=${token}`);
            }
        });
};


module.exports = {
    generateToken
};