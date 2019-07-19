const {
    getAllUsers
} = require('../services/superadmin.service');

const getUsers = (req, res, next) => {
    const {
        limit,
        skip,
        roles
    } = req.query;
    getAllUsers(req.userId, parseInt(limit) || 10, parseInt(skip) || 0, roles)
        .then((users) => {
            res.send({users})
        })
        .catch((err) => {
            res.status(500).send({message: err});
        })
};

module.exports = {
    getUsers
};