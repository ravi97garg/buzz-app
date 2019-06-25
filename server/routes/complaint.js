const Express = require('express');
const router = Express.Router();
const {getDepartments, postComplaint, electAdmin, getUserComplaintsBrief, getUserComplaintsDetailed} = require('../services/complaint.service');
const {getFirstAdminStrategy} = require('../utilities');
const {multerUploads, dataUri} = require('../config/multer.config');
const {uploader} = require('../config/cloudinary.config');
const Complaint = require('../models/Complaint');
const sgMail = require('../config/sendgrid.config');

router.get('/getDepartments', (req, res) => {
    getDepartments().then((departments) => {
        res.send(departments);
    }).catch((error) => {
        console.error(error);
        res.send({message: 'Unable to get all the departments', status: 2})
    })
});

router.post('/postComplaint', multerUploads, (req, res) => {
        try {
            if (req.files) {
                let uploaderPromises = [];
                req.files.forEach((file) => {
                    let base64file = dataUri(file).content;
                    uploaderPromises.push(uploader.upload(base64file));
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
                    Complaint.populate(newComplaint, {path:"assignedTo"}, function(err, populatedComplaint) {
                        if(err){
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
                            sgMail.send(msgToLogger);
                            sgMail.send(msgToAssignee);
                            res.send({newComplaint: populatedComplaint, status: 1});
                        }
                    });
                }).catch((err) => {
                    console.error(err);
                    res.send({message: 'DBError', status: 2});

                })
            }
        } catch (e) {
            console.error(e);
            res.send(e);
        }

    }
);

router.get('/getMyComplaint', (req, res) => {
    if(req.query['type'] === 'brief'){
        getUserComplaintsBrief(req.userId).then((complaints) => {
            res.send({complaints, status: 1});
        }).catch(() => {
            res.send({message: 'DBError', status: 2});
        });
    } else if(req.query['type'] === 'detailed'){
        const complaintId = req.query['id'];
        getUserComplaintsDetailed(complaintId).then((complaints) => {
            res.send({complaints, status: 1});
        }).catch(() => {
            res.send({message: 'DBError', status: 2});
        });
    } else {
        res.send({message: 'Not Authenticated', status: 0})
    }

});


module.exports = router;