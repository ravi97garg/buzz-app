const Express = require('express');
const {getDepartments} = require("../services/complaint.service");
const router = Express.Router();
const {getInitResolves, changeStatusService} = require('../services/resolve.service');

router.get('/getInitComplaints', (req, res) => {
    getInitResolves().then((resolves) => {
        res.send({complaints: resolves, status: 1});
    }).catch((err) => {
        console.error('Oops! Something went wrong');
        res.send({message: 'DBError', status: 2});
    })
});

router.post('/changeStatus', (req, res) => {
    const {complaintId, status} = req.body;
    changeStatusService(complaintId, status).then(() => {
        res.send({message: 'status changed successfully', status: 1})
    }).catch((err) => {
        console.error(err);
        res.send({message: 'DBError', status: 2});
    })
})



module.exports = router;