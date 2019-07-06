const {assignResolve} = require("../services/resolve.service");
const {getMyDepartmentResolves} = require("../services/resolve.service");
const {changeStatusService} = require("../services/resolve.service");
const {getInitResolves} = require("../services/resolve.service");

const getInitialResolves = (req, res) => {
    getInitResolves().then((resolves) => {
        res.send({complaints: resolves, status: 1});
    }).catch((err) => {
        console.error(err);
        res.status(400).send({message: 'DBError', status: 2});
    })
};

const getResolvesByDepartment = (req, res) => {
    getMyDepartmentResolves(req.user).then((resolves) => {
        res.send({complaints: resolves, status: 1});
    }).catch((err) => {
        console.error(err);
        res.status(400).send({message: 'DBError', status: 2})
    });
};

const changeResolveStatus = (req, res) => {
    const {complaintId, status} = req.body;
    changeStatusService(complaintId, status).then(() => {
        res.send({message: 'status changed successfully', status: 1})
    }).catch((err) => {
        console.error(err);
        res.status(400).send({message: 'DBError', status: 2});
    })
};

const reassignResolve = (req, res) => {
    assignResolve(req.resolveId, req.userId)
        .then(() => {
            res.send({message: 'OK', status: 1});
        })
        .catch((err) => {
            res.status(400).send();
        })
}

module.exports = {
    getInitialResolves,
    getResolvesByDepartment,
    changeResolveStatus,
    reassignResolve
};