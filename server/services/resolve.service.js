const Complaint = require('../models/Complaint');

const getResolveById = (resolveId) => {
    return Complaint
        .findOne({uid: resolveId})
        .populate({
            path: 'loggedBy'
        })
        .populate({
            path: 'assignedTo'
        });
};

const getInitResolves = (limit , skip ) => {
    return Complaint.find()
        .skip(skip)
        .limit(limit)
        .sort({'createdAt': -1})
        .populate({
            path: 'loggedBy'
        })
        .populate({
            path: 'assignedTo'
        })
};

const getAllResolveCount = () => {
    return Complaint.find().countDocuments();
};

const getDeptComplaintCount = (department) => {
    return Complaint.find({department}).countDocuments();
};

const getResolvesByDepartment = (department, limit = 10, skip = 0) => {
    return Complaint.find({department})
        .skip(skip)
        .limit(limit)
        .sort({'createdAt': -1})
        .populate({
            path: 'loggedBy'
        })
        .populate({
            path: 'assignedTo'
        })
};

const changeStatus = (complaintId, status) => {
    return Complaint.updateOne({uid: complaintId}, {status: status});
};

const assignResolve = (resolveId, userId) => {
    return Complaint.updateOne({uid: resolveId}, {assignedTo: userId})
};

module.exports = {
    getResolveById,
    getInitResolves,
    changeStatus,
    getResolvesByDepartment,
    assignResolve,
    getAllResolveCount,
    getDeptComplaintCount
};