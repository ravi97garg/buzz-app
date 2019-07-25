const User = require('../models/User');
const {userRoles, activeStatus} = require('../constants');

const getAllUsers = (userId, limit = 10, skip = 0, roles = Object.values(userRoles)) => {
    return User.find({_id: {$ne: userId}, role: {$in: [...roles]}})
        .skip(skip)
        .limit(limit)
};

const updateStatus = (userId, status, role) => {
    const objToUpdate = {};
    if(status) objToUpdate.activeStatus = status;
    if(role) objToUpdate.role = role;
    return User.updateOne({_id: userId}, {$set: objToUpdate})
};

module.exports = {
    getAllUsers,
    updateStatus
};