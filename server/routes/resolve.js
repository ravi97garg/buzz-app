const Express = require('express');
const {reassignResolve} = require("../controllers/ResolveController");
const router = Express.Router();
const {
    getInitialResolves,
    getResolvesByDepartment,
    changeResolveStatus
} = require('../controllers/ResolveController');

router.get('/getInitComplaints', getInitialResolves);

router.get('/getMyDeptResolves', getResolvesByDepartment);

router.post('/changeStatus', changeResolveStatus);

router.get('/assignResolve/:resolveId',
    (req, res, next) => {
        if (req.params.resolveId) {
            req.resolveId = req.params.resolveId;
            next()
        } else {
            res.status(400).send()
        }
    }, reassignResolve
);

module.exports = router;