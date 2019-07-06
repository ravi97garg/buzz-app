const {postComplaint} = require("../services/complaint.service");
const {getFirstAdminStrategy} = require("../utilities");
const {electAdmin} = require("../services/complaint.service");
const {dataUri} = require("../config/multer.config");
const {getDepartments} = require("../services/complaint.service");
const {uploader} = require("../config/cloudinary.config");
const Complaint = require("../models/Complaint");
const sgMail = require('../config/sendgrid.config');
const {getUserComplaintsDetailed} = require("../services/complaint.service");
const {getUserComplaintsBrief} = require("../services/complaint.service");

const getAdminDepartments = (req, res) => {
    getDepartments().then((departments) => {
        res.send(departments);
    }).catch((error) => {
        console.error(error);
        res.send({message: 'Unable to get all the departments', status: 2})
    })
};

const createNewComplaint = (req, res) => {
    try {
        if (req.files) {
            let uploaderPromises = [];
            req.files.forEach((file) => {
                uploaderPromises.push(uploader.upload(dataUri(file).content));
            });
            Promise.all(uploaderPromises).then(async (result) => {
                req.body.images = result.map((file) => {
                    return file.secure_url
                });
                const complaintObj = {
                    department: req.body.complaintDepartment,
                    subject: req.body.complaintTitle,
                    complaintContent: req.body.complaintContent,
                    email: req.user.email,
                    images: req.body.images,
                    loggedBy: req.user._id,
                    assignedTo: await electAdmin(req.body.complaintDepartment, getFirstAdminStrategy),
                    status: 'Pending'
                };
                const newComplaint = await postComplaint(complaintObj);
                Complaint.populate(newComplaint, {path: "assignedTo"}, function (err, populatedComplaint) {
                    if (err) {
                        res.send({message: 'DBError', status: 2});
                    } else {
                        const msgToLogger = {
                            to: populatedComplaint.email,
                            from: 'no-reply@ttn-buzz.com',
                            subject: `Complaint ID: ${populatedComplaint._id}`,
                            html: `Hi <strong>${req.user.name}</strong>, <br/>The complaint with the title <strong>${populatedComplaint.subject}</strong> has been logged by you. The complaint is assigned to <strong>${populatedComplaint.assignedTo.name}</strong> successfully. You can go through the complaint details and track the complaints <a href="#">here</a>. <br/>Hope your issue would be resolved soon. <br/><br/>Regards. <br/>Admin. <br/>${populatedComplaint.department} Department`,
                        };
                        const msgToAssignee = {
                            to: populatedComplaint.assignedTo.email,
                            from: 'no-reply@ttn-buzz.com',
                            subject: `Complaint ID: ${populatedComplaint._id}`,
                            html: `Hi <strong>${populatedComplaint.assignedTo.name}</strong>, <br/>The complaint with the title <strong>${populatedComplaint.subject}</strong> has been assigned to you. The complaint is assigned by <strong>${req.user.name}(${populatedComplaint.email})</strong> successfully. You can go through the complaint details and track the complaints <a href="#">here</a>. <br/>Hope you would look into the matter. <br/><br/>Regards. <br/>Admin. <br/>${populatedComplaint.department} Department`,
                        };
                        sgMail.send(msgToLogger)
                            .then(() => console.log("mailed successfully to logger"))
                            .catch(() => console.log("mail failed"));
                        sgMail.send(msgToAssignee)
                            .then(() => console.log("mailed successfully to assignee"))
                            .catch(() => console.log("mail failed"));
                        res.send({newComplaint: populatedComplaint, status: 1});
                    }
                });
            }).catch((err) => {
                console.error(err);
                res.status(400).send({message: 'DBError', status: 2});

            })
        }
    } catch (e) {
        console.error(e);
        res.status(400).send(e);
    }
};

const getMyComplaints = (req, res) => {
    if (req.query['type'] === 'brief') {
        getUserComplaintsBrief(req.userId).then((complaints) => {
            res.send({complaints, status: 1});
        }).catch(() => {
            res.status(400).send({message: 'DBError', status: 2});
        });
    } else if (req.query['type'] === 'detailed') {
        const complaintId = req.query['id'];
        getUserComplaintsDetailed(complaintId).then((complaints) => {
            res.send({complaints, status: 1});
        }).catch(() => {
            res.status(400).send({message: 'DBError', status: 2});
        });
    } else {
        res.send({message: 'Not Authenticated', status: 0})
    }
};

module.exports = {
    getAdminDepartments,
    createNewComplaint,
    getMyComplaints
};