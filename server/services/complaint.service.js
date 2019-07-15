const Complaint = require('../models/Complaint');
const User = require('../models/User');
const {getFirstAdminStrategy} = require('../utilities');

const getDepartments = () => {
    return User
        .find({role: 'Admin'})
        .distinct('department');
};

const postComplaint = (complaint) => {
    const newComplaint = new Complaint;
    newComplaint.department = complaint.department;
    newComplaint.subject = complaint.subject;
    newComplaint.complaintContent = complaint.complaintContent;
    newComplaint.email = complaint.email;
    newComplaint.images = complaint.images;
    newComplaint.loggedBy = complaint.loggedBy;
    newComplaint.assignedTo = complaint.assignedTo;
    newComplaint.status = complaint.status;

    return newComplaint.save();

};

const electAdmin = async (department, strategy = getFirstAdminStrategy) => {
    const admin =  await strategy(department);
    return admin._id;
};

const getUserComplaintsDetailed = (complaintId) => {
    return Complaint
        .findOne({_id: complaintId})
        .populate({
            path: 'assignedTo'
        })
        .populate({
            path: 'loggedBy'
        });
};

const getUserComplaintsBrief = (user, limit = 10, skip = 0) => {
    return Complaint
        .find({loggedBy: user}, {subject: 1, department: 1, status: 1, assignedTo: 1})
        .skip(skip)
        .limit(limit)
        .sort({'createdAt': -1})
        .populate({
            path: 'assignedTo'
        })
};

const getComplaintsTotalCount = (userId) => {
    return Complaint.find({loggedBy: userId}).countDocuments()
};

module.exports = {
    getDepartments,
    postComplaint,
    electAdmin,
    getUserComplaintsBrief,
    getUserComplaintsDetailed,
    getComplaintsTotalCount
};
