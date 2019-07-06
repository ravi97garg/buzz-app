const Express = require('express');
const router = Express.Router();
const {multerUploads} = require('../config/multer.config');
const {
    getAdminDepartments,
    createNewComplaint,
    getMyComplaints
} = require("../controllers/ComplaintController");

router.get('/getDepartments',
    getAdminDepartments
);

router.post('/postComplaint',
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


module.exports = router;