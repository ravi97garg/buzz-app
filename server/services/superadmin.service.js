const User = require('../models/User');
const {userRoles, activeStatus} = require('../constants');

const getAllUsers = (userId, limit = 10, skip = 0, roles = Object.values(userRoles)) => {
    return User.find({_id: {$ne: userId}, role: {$in: [...roles]}})
        .skip(skip)
        .limit(limit)
};

const updateStatus = (userId, status) => {
    return User.updateOne({_id: userId}, {activeStatus: status})
};

module.exports = {
    getAllUsers,
    updateStatus
};