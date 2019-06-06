const rolesModel = require('../models/Roles');

const isAdmin = (user) => {
    rolesModel.findOne({
        email: user.email
    }).exec((err, rolesData) => {
        return rolesData
    });
    return false;
};

module.exports = {
    isAdmin
}
