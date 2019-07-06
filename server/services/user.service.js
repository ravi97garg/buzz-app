const User = require('../models/User');

const findUserByID = (id) => {
    return User.findOne({_id: id})
};

const findUserByEmail = (email) => {
    return User.findOne({email: email})
};

const changeProfileService = (id, image) => {
    return User.updateOne({_id: id}, {profileImage: image});
};

module.exports = {
    findUserByID,
    findUserByEmail,
    changeProfileService
};
