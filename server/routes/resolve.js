const Express = require('express');

const {
    getInitialResolves,
    getResolvesByDepartment,
    changeResolveStatus,
    reassignResolve
} = require('../controllers/ResolveController');

const router = Express.Router();

router.get('/getInitComplaints',
    getInitialResolves
);

router.get('/getMyDeptResolves',
    (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(400).send();
        }
    },
    getResolvesByDepartment
);

router.post('/changeStatus',
    (req, res, next) => {
        const {
            complaintId,
            status
        } = req.body;
        if (complaintId && status) {
            next();
        } else {
            res.status(400).send();
        }
    },
    changeResolveStatus
);

router.get('/assignResolve/:resolveId',
    (req, res, next) => {
        const {
            resolveId
        } = req.params;
        if (resolveId) {
            req.resolveId = resolveId;
            next()
        } else {
            res.status(400).send();
        }
    }, reassignResolve
);

module.exports = router;