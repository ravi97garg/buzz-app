const Complaint = require('../models/Complaint');
const Role = require('../models/Roles');
const {getFirstAdminStrategy} = require('../utilities');

const getDepartments = () => {
    return Role.find().distinct('department');
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

module.exports = {
    getDepartments,
    postComplaint,
    electAdmin
};
