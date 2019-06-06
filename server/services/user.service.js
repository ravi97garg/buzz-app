const User = require('../models/User');

const findUserByID = (id) => {
    return User.findOne({_id: id})
};

module.exports = {
    findUserByID
};
