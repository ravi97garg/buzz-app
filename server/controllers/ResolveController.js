const {
    getResolveById,
    getInitResolves,
    changeStatus,
    getResolvesByDepartment,
    assignResolve,
    getAllResolveCount,
    getDeptComplaintCount
} = require("../services/resolve.service");
const {
    msgToLogger,
    msgToAssignee
} = require("../mailTemplates/resolve/statusChangeEventMail");

const getInitialResolves = async (req, res) => {
    try {
        let {
            limit = 10,
            skip = 0
        } = req.query;
        if (req.params.department) {
            const complaints = await getResolvesByDepartment(req.params.department, parseInt(limit), parseInt(skip));
            const complaintsCount = await getDeptComplaintCount(req.params.department);
            delete complaints._id;
            res.send({complaints, complaintsCount});
        } else {
            const complaints = await getInitResolves(parseInt(limit), parseInt(skip));
            const complaintsCount = await getAllResolveCount();
            delete complaints._id;
            res.send({complaints, complaintsCount});
        }
    } catch (err) {
        res.status(500).send({message: err})
    }
};


const changeResolveStatus = (req, res) => {
    const {complaintId, status} = req.body;
    changeStatus(complaintId, status).then(() => {
        getResolveById(complaintId
            .then((complaint) => {
                const {
                    loggedBy: {
                        email: loggedByEmail,
                        name: loggedbyName
                    },
                    assignedTo: {
                        email: assignedToEmail,
                        name: assignedToName
                    },
                    department,
                    subject
                } = complaint;
                msgToLogger(
                    loggedByEmail,
                    complaintId,
                    loggedbyName,
                    subject,
                    assignedToName,
                    department,
                    status
                );
                msgToAssignee(
                    assignedToEmail,
                    complaintId,
                    assignedToName,
                    subject,
                    status,
                    department
                )
            })
            .catch((err) => {
                res.status(500).send({message: err});
            })
        );
        res.send({message: 'status changed successfully'})
    }).catch((err) => {
        res.status(500).send({message: err});
    })
};

const reassignResolve = (req, res) => {
    assignResolve(req.resolveId, req.userId)
        .then(() => {
            res.send({message: 'Resolve assigned successfully'});
        })
        .catch((err) => {
            res.status(500).send({message: err});
        })
};

module.exports = {
    getInitialResolves,
    changeResolveStatus,
    reassignResolve
};