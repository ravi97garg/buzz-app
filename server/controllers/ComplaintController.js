const async = require('async');
const generate = require('nanoid/async/generate');

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
        res.status(500).send({message: err})
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
            uid: await generate('0123456789ABCDEF', 8),
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
                res.status(500).send({message: err});
            } else {
                const {
                    email: loggedByEmail,
                    uid: uid,
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
                    uid,
                    loggedByName,
                    complaintSubject,
                    assignedToName,
                    department
                );
                msgToAssignee(
                    assignedToEmail,
                    uid,
                    assignedToName,
                    complaintSubject,
                    loggedByName,
                    loggedByEmail,
                    department
                );
                delete populatedComplaint._id;
                res.send({newComplaint: populatedComplaint});
            }
        });
    })
        .catch((err) => {
            res.status(401).send({message: err});

        })

};

const getMyComplaints = async (req, res) => {
    if (req.query.type === complaintReqType.BRIEF) {
        const {
            limit,
            skip,
            complaintStatus
        } = req.query;
        try {
            const complaintsBrief = await getUserComplaintsBrief(req.userId, parseInt(limit), parseInt(skip), complaintStatus);
            const complaintsCount = await getComplaintsTotalCount(req.userId, complaintStatus);
            delete complaintsBrief._id;
            res.send({
                complaints: complaintsBrief,
                complaintsCount
            });

        } catch (err) {
            res.status(500).send({message: err});
        }
    } else if (req.query.type === complaintReqType.DETAILED) {
        const complaintId = req.query.uid;
        getUserComplaintsDetailed(complaintId).then((complaints) => {
            delete complaints._id;
            res.send({complaints});
        }).catch((err) => {
            res.status(500).send({message: err});
        });
    } else {
        res.status(401).send({message: 'Not Authenticated'})
    }
};

const getComplaintsCount = (req, res) => {
    getComplaintsTotalCount(req.userId)
        .then((count) => res.send({count}))
        .catch(err => {
            res.status(500).send({message: err})
        });
};

module.exports = {
    getAdminDepartments,
    createNewComplaint,
    getMyComplaints,
    getComplaintsCount
};