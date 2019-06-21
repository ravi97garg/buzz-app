const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../constants');
const User = require('../models/User');

const verifyToken = (token, secretKey = JWT_KEY) => {
    let verifyResponse = '';
    jwt.verify(token, secretKey, (err, decoded) => {
        verifyResponse = decoded ? decoded : '';
    });
    return verifyResponse;
};

const signToken = (userObj, secretKey = JWT_KEY) => {
    let token = '';
    jwt.sign(userObj, secretKey, (err, encoded) => {
        token = encoded ? encoded : '';
    });
    return token;
};

const getFirstAdminStrategy = (department) => {
    return User.findOne({department: department, role: 'Admin'});
};

module.exports = {
    signToken,
    verifyToken,
    getFirstAdminStrategy
};