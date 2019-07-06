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

const signToken = (email, secretKey = JWT_KEY) => {
    let token = '';
    jwt.sign(email, secretKey, (err, encoded) => {
        token = encoded ? encoded : '';
    });
    return token;
};

const getFirstAdminStrategy = (department) => {
    return User.findOne({department: department, role: 'Admin'});
};

const getRandomAdminStrategy = async (department) => {
    try {
        const count = await User.find({department: department, role: 'Admin'})
            .count();
        const random = Math.floor(Math.random() * count);
        return User.findOne().skip(random);
    } catch (e) {
        return User.findOne({department: department, role: 'Admin'});
    }
};

module.exports = {
    signToken,
    verifyToken,
    getFirstAdminStrategy,
    getRandomAdminStrategy
};