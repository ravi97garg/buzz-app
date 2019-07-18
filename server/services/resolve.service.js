const Complaint = require('../models/Complaint');
const {
    complaintStatus
} = require('../constants');

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

const getInitResolves = (limit , skip, statuses = Object.values(complaintStatus)) => {
    return Complaint.find({status: {$in: [...statuses]}})
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

const getAllResolveCount = (statuses = Object.values(complaintStatus)) => {
    return Complaint.find({status: {$in: [...statuses]}}).countDocuments();
};

const getDeptComplaintCount = (department, statuses = Object.values(complaintStatus)) => {
    return Complaint.find({department, status: {$in: [...statuses]}}).countDocuments();
};

const getResolvesByDepartment = (department, limit = 10, skip = 0, statuses = Object.values(complaintStatus)) => {
    return Complaint.find({department, status: {$in: [...statuses]}})
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