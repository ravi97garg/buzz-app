const {
    assignResolve,
    getMyDepartmentResolves,
    changeStatus,
    getInitResolves,
    getResolveById
} = require("../services/resolve.service");
const {
    msgToLogger,
    msgToAssignee
} = require("../mailTemplates/resolve/statusChangeEventMail");

const getInitialResolves = (req, res) => {
    getInitResolves()
        .then((resolves) => {
            res.send({complaints: resolves, status: 1});
        }).catch((err) => {
        res.status(400).send({message: err, status: 2});
    })
};

const getResolvesByDepartment = (req, res) => {
    getMyDepartmentResolves(req.user).then((resolves) => {
        res.send({complaints: resolves, status: 1});
    }).catch((err) => {
        res.status(400).send({message: err, status: 2})
    });
};

const changeResolveStatus = (req, res) => {
    const {complaintId, status} = req.body;
    changeStatus(complaintId, status).then(() => {
        getResolveById(complaintId
            .then((complaint) => {
                msgToLogger(
                    complaint.loggedBy.email,
                    complaintId,
                    complaint.loggedBy.name,
                    complaint.subject,
                    complaint.assignedTo.name,
                    complaint.department,
                    status
                )
                msgToAssignee(
                    complaint.assignedTo.email,
                    complaintId,
                    complaint.assignedTo.name,
                    complaint.subject,
                    status,
                    complaint.department
                )
            })
            .catch((err) => {
                res.status(400).send({message: err, status: 2});
            })
        );
        res.send({message: 'status changed successfully', status: 1})
    }).catch((err) => {
        res.status(400).send({message: err, status: 2});
    })
};

const reassignResolve = (req, res) => {
    assignResolve(req.resolveId, req.userId)
        .then(() => {
            res.send({message: 'OK', status: 1});
        })
        .catch(() => {
            res.status(400).send();
        })
};

module.exports = {
    getInitialResolves,
    getResolvesByDepartment,
    changeResolveStatus,
    reassignResolve
};