const jwt = require('jsonwebtoken');
const JWT_KEY = require('../constants').JWT_KEY;
const Roles = require('../models/Roles');

const verifyToken = (token, secretKey = JWT_KEY) => {
    let verifyResponse;
    jwt.verify(token, secretKey, (err, decoded) => {
        verifyResponse = decoded ? decoded : '';
    });
    return verifyResponse;
};

const signToken = (userObj, secretKey = JWT_KEY) => {
    let token;
    jwt.sign(userObj, secretKey, (err, encoded) => {
        token = encoded ? encoded : '';
    });
    return token;
};

const getFirstAdminStrategy = (department) => {
    return Roles.findOne({department: department});
};

module.exports = {
    verifyToken,
    getFirstAdminStrategy
};