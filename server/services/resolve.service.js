const Complaint = require('../models/Complaint');

const getResolveById = (resolveId) => {
    return Complaint
        .findOne({_id: resolveId})
        .populate({
            path: 'loggedBy'
        })
        .populate({
            path: 'assignedTo'
        });
};

const getInitResolves = () => {
    return Complaint.find()
        .sort({'createdAt': -1})
        .populate({
            path: 'loggedBy'
        })
        .populate({
            path: 'assignedTo'
        })
};

const getMyDepartmentResolves = (user) => {
    return Complaint.find({department: user.department})
        .sort({'createdAt': -1})
        .populate({
            path: 'loggedBy'
        })
        .populate({
            path: 'assignedTo'
        })
};

const changeStatus = (complaintId, status) => {
    return Complaint.updateOne({_id: complaintId}, {status: status});
};

const assignResolve = (resolveId, userId) => {
    return Complaint.updateOne({_id: resolveId}, {assignedTo: userId})
};

module.exports = {
    getResolveById,
    getInitResolves,
    changeStatus,
    getMyDepartmentResolves,
    assignResolve
};