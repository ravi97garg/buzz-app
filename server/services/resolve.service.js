const Complaint = require('../models/Complaint');

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

const changeStatusService = (complaintId, status) => {
    return Complaint.updateOne({_id: complaintId}, {status: status});
};

module.exports = {
    getInitResolves,
    changeStatusService,
    getMyDepartmentResolves
};
