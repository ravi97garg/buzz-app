const User = require('../models/User');
const {userRoles} = require('../constants');

const getAllUsers = (userId, limit = 10, skip = 0, roles = [Object.values(userRoles)]) => {
    return User.find({_id: {$ne: userId}, role: {$in: [...roles]}})
        .skip(skip)
        .limit(limit)
};

module.exports = {
    getAllUsers
};