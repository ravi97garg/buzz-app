const Complaint = require('../models/Complaint');
const User = require('../models/User');
const {getFirstAdminStrategy} = require('../utilities');
const {
    userRoles,
    complaintStatus
} = require('../constants');

const getDepartments = () => {
    return User
        .find({role: userRoles.ADMIN})
        .distinct('department');
};

const postComplaint = (complaint) => {
    const {
        uid,
        department,
        subject,
        complaintContent,
        email,
        images,
        loggedBy,
        assignedTo,
        status
    } = complaint;
    const newComplaint = new Complaint;
    newComplaint.uid = uid;
    newComplaint.department = department;
    newComplaint.subject = subject;
    newComplaint.content = complaintContent;
    newComplaint.email = email;
    newComplaint.images = images;
    newComplaint.loggedBy = loggedBy;
    newComplaint.assignedTo = assignedTo;
    newComplaint.status = status;

    return newComplaint.save();

};

const electAdmin = async (department, strategy = getFirstAdminStrategy) => {
    const admin = await strategy(department);
    return admin._id;
};

const getUserComplaintsDetailed = (complaintId) => {
    return Complaint
        .findOne({uid: complaintId})
        .populate({
            path: 'assignedTo'
        })
        .populate({
            path: 'loggedBy'
        });
};

const getUserComplaintsBrief = (user, limit = 10, skip = 0, statuses =
    Object.values(complaintStatus)) => {
    return Complaint
        .find({loggedBy: user, status: {$in: [...statuses]}}, {
            _id: 0,
            uid: 1,
            subject: 1,
            department: 1,
            status: 1,
            assignedTo: 1
        })
        .skip(skip)
        .limit(limit)
        .sort({'createdAt': -1})
        .populate({
            path: 'assignedTo'
        })
};

const getComplaintsTotalCount = (userId, statuses = Object.values(complaintStatus)) => {
    return Complaint.find({loggedBy: userId, status: {$in: [...statuses]}}).countDocuments()
};

module.exports = {
    getDepartments,
    postComplaint,
    electAdmin,
    getUserComplaintsBrief,
    getUserComplaintsDetailed,
    getComplaintsTotalCount
};
