const Complaint = require('../models/Complaint');
const Role = require('../models/Roles');

const getInitResolves = () => {
    return Complaint.find()
        .sort({'createdAt': -1})
        .populate({
            path: 'loggedBy'
        })
};

const changeStatusService = (complaintId, status) => {
    return Complaint.update({_id: complaintId}, {status: status});
};

module.exports = {
    getInitResolves,
    changeStatusService
};
