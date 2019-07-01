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
    createNewComplaint
);

router.get('/getMyComplaint',
    getMyComplaints
);


module.exports = router;