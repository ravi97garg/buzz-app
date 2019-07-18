const Express = require('express');

const {cloudinaryConfig} = require("../config/cloudinary.config");
const {multerUploads} = require('../config/multer.config');
const {complaintReqType} = require('../constants');
const {
    getAdminDepartments,
    createNewComplaint,
    getMyComplaints,
    getComplaintsCount
} = require("../controllers/ComplaintController");

const router = Express.Router();

router.get('/getDepartments',
    getAdminDepartments
);

router.post('/postComplaint',
    cloudinaryConfig,
    multerUploads,
    (req, res, next) => {
        const {
            complaintDepartment,
            complaintTitle,
            complaintContent,
        } = req.body;
        const {
            _id,
            email
        } = req.user;
        if (req.files && _id && email && complaintDepartment && complaintContent && complaintTitle) {
            next();
        } else {
            res.status(400).send();
        }
    },
    createNewComplaint
);

router.get('/getMyComplaint',
    (req, res, next) => {
        const complaintRequestType = req.query.type;
        if (complaintRequestType === complaintReqType.BRIEF || complaintRequestType === complaintReqType.DETAILED) {
            next();
        } else {
            res.status(401).send();
        }
    },
    getMyComplaints
);

router.get('/getComplaintCount',
    getComplaintsCount
);

module.exports = router;