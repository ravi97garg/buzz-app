const Express = require('express');
const router = Express.Router();
const {
    getInitialResolves,
    getResolvesByDepartment,
    changeResolveStatus
} = require('../controllers/ResolveController');

router.get('/getInitComplaints', getInitialResolves);

router.get('/getMyDeptResolves', getResolvesByDepartment);

router.post('/changeStatus', changeResolveStatus);

module.exports = router;