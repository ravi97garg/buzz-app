const User = require('../models/User');

const isAdmin = (user) => {
    User.findOne({
        role: 'Admin',
        email: user.email
    }).exec((err, rolesData) => {
        return rolesData
    });
    return false;
};

module.exports = {
    isAdmin
};
