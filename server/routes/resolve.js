const Express = require('express');

const {
    getInitialResolves,
    changeResolveStatus,
    reassignResolve
} = require('../controllers/ResolveController');

const router = Express.Router();

router.get('/getComplaints/:department?', (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(422).send({message: 'Expected data not found'});
        }
    },
    getInitialResolves
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
            res.status(422).send({message: 'Expected data not found'});
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
            res.status(422).send({message: 'Expected data not found'});
        }
    }, reassignResolve
);

module.exports = router;