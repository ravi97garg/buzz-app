const User = require('../models/User');
const {userRoles} = require('../constants');

const isAdmin = (user) => {
    User.findOne({
        role: userRoles.ADMIN,
        email: user.email
    }).exec((err, rolesData) => {
        return rolesData
    });
    return false;
};

module.exports = {
    isAdmin
};
