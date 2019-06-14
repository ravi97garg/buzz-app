const Express = require('express');
const router = Express.Router();
const {getDepartments, postComplaint, electAdmin, getUserComplaints} = require('../services/complaint.service');
const {getFirstAdminStrategy} = require('../utilities');

router.get('/getDepartments', (req, res) => {
    getDepartments().then((departments) => {
        res.send(departments);
    }).catch((error) => {
        console.error(error);
        res.send({message: 'Unable to get all the departments', status: 2})
    })
});

router.post('/postComplaint', async (req, res) => {
    try{
        const complaintObj = {
            department: req.body.complaintDepartment,
            subject: req.body.complaintTitle,
            complaintContent: req.body.complaintContent,
            email: req.user.email,
            images: [],
            loggedBy: req.user._id,
            assignedTo: await electAdmin(req.body.complaintDepartment, getFirstAdminStrategy),
            status: 'Pending'
        };
        const newComplaint = await postComplaint(complaintObj)
        res.send({newComplaint, status: 1})
    } catch (e) {
        console.error(e);
        res.send(e);
    }

});

router.get('/getMyComplaint', (req, res) => {
    getUserComplaints(req.userId).then((complaints) => {
        res.send({complaints, status: 1});
    }).catch(e => {
        res.send({message: 'DBError', status: 2});
    });
});


module.exports = router;