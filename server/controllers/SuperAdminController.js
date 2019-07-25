const {
    getAllUsers,
    updateStatus
} = require('../services/superadmin.service');

const getUsers = (req, res) => {
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

const changeUserStatus = (req, res) => {
    const {
        userId
    } = req.params;
    const {
        status
    } = req.query;
    updateStatus(userId, status).then(() => {
        res.send({message: 'activation status updated succesfully'})
    }).catch((err) => {
        res.status(500).send({message: err})
    });
};

module.exports = {
    getUsers,
    changeUserStatus
};