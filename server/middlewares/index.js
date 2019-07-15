const {verifyToken} = require("../utilities");
const {findUserByEmail} = require('../services/user.service');

const dataRouteMiddleware = (req, res, next) => {
    let decodedToken = verifyToken(req.headers.authorization);
    if (decodedToken.email) {
        findUserByEmail(decodedToken.email)
            .then((user) => {
                req.userId = user._id;
                req.user = user;
                next();
            })
            .catch((err) => {
                res.status(401).send(err)
            })
    } else {
        res.status(401).send({message: 'Not authenticated', status: 0});
    }
};

const cors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
};

module.exports = {
    dataRouteMiddleware,
    cors
};