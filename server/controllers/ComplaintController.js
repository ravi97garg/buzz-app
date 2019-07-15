const async = require('async');

const Complaint = require("../models/Complaint");
const {getFirstAdminStrategy} = require("../utilities");
const {dataUri} = require("../config/multer.config");
const {uploader} = require("../config/cloudinary.config");

const {
    complaintReqType,
    complaintStatus
} = require('../constants');
const {
    postComplaint,
    electAdmin,
    getComplaintsTotalCount,
    getDepartments,
    getUserComplaintsBrief,
    getUserComplaintsDetailed
} = require("../services/complaint.service");
const {
    msgToLogger,
    msgToAssignee
} = require("../mailTemplates/complaint/newComplaintEventMail");

const getAdminDepartments = (req, res) => {
    getDepartments().then((departments) => {
        res.send(departments);
    }).catch((err) => {
        res.send({message: err, status: 2})
    })
};

const createNewComplaint = (req, res) => {
    req.body.images = [];
    async.forEachOf(req.files, async (file) => {
        let image = await uploader.upload(dataUri(file).content);
        req.body.images.push(image.secure_url);
    }).then(async () => {
        const {
            body: {
                complaintDepartment,
                complaintTitle,
                complaintContent,
                images
            },
            user: {
                _id,
                email
            }
        } = req;

        const complaintObj = {
            department: complaintDepartment,
            subject: complaintTitle,
            complaintContent: complaintContent,
            email: email,
            images: images,
            loggedBy: _id,
            assignedTo: await electAdmin(complaintDepartment, getFirstAdminStrategy),
            status: complaintStatus.PENDING
        };
        const newComplaint = await postComplaint(complaintObj);
        Complaint.populate(newComplaint, {path: "assignedTo"}, function (err, populatedComplaint) {
            if (err) {
                res.send({message: err, status: 2});
            } else {
                const {
                    email: loggedByEmail,
                    _id: complaintId,
                    subject: complaintSubject,
                    assignedTo: {
                        name: assignedToName,
                        email: assignedToEmail
                    },
                    department
                } = populatedComplaint;
                const {
                    user: {
                        name: loggedByName
                    }
                } = req;
                msgToLogger(
                    loggedByEmail,
                    complaintId,
                    loggedByName,
                    complaintSubject,
                    assignedToName,
                    department
                );
                msgToAssignee(
                    assignedToEmail,
                    complaintId,
                    assignedToName,
                    complaintSubject,
                    loggedByName,
                    loggedByEmail,
                    department
                );
                res.send({newComplaint: populatedComplaint, status: 1});
            }
        });
    })
        .catch((err) => {
            res.status(400).send({message: err, status: 2});

        })

};

const getMyComplaints = async (req, res) => {
    if (req.query.type === complaintReqType.BRIEF) {
        const {
            limit,
            skip
        } = req.query;
        try {
            const complaintsBrief = await getUserComplaintsBrief(req.userId, parseInt(limit), parseInt(skip));
            const complaintsCount = await getComplaintsTotalCount(req.userId);
            res.send({
                complaints: complaintsBrief,
                complaintsCount,
                status: 1
            });

        } catch (err) {
            res.status(400).send({message: err, status: 2});
        }
    } else if (req.query.type === complaintReqType.DETAILED) {
        const complaintId = req.query.id;
        getUserComplaintsDetailed(complaintId).then((complaints) => {
            res.send({complaints, status: 1});
        }).catch((err) => {
            res.status(400).send({message: err, status: 2});
        });
    } else {
        res.status(401).send({message: 'Not Authenticated', status: 0})
    }
};

const getComplaintsCount = (req, res) => {
    getComplaintsTotalCount(req.userId)
        .then((count) => res.send({count}))
        .catch(err => {
            res.status(400).send({message: err})
        });
};

module.exports = {
    getAdminDepartments,
    createNewComplaint,
    getMyComplaints,
    getComplaintsCount
};