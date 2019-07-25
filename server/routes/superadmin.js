const Express = require(`express`);

const router = Express.Router();
const {
    getUsers,
    changeUserStatus
} = require(`../controllers/SuperAdminController`);
const {
    activeStatus,
    userRoles
} = require(`../constants`);

router.get(`/getUsers`, (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.status(401).send({message: `Not Authenticated to access this route`});
        }
    },
    getUsers
);

router.get(`/changeUserStatus/:userId`, (req, res, next) => {
        const {
            userId
        } = req.params;
        const {
            status,
            role
        } = req.query;
        if (!userId || (!status && !role)) {
            res.status(401).send({message: `Not Authenticated to access this route`});
        } else if (status && Object.values(activeStatus).indexOf(status) === -1) {
            res.status(401).send({message: `Status: ${status} sent is not valid`});
        } else if (role && Object.values(userRoles).indexOf(role) === -1) {
            res.status(401).send({message: `Role: ${status} sent is not valid`});
        } else {
            next();
        }
    },
    changeUserStatus
);

module.exports = router;