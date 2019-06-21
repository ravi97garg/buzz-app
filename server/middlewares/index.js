const {verifyToken} = require("../utilities");

const dataRouteMiddleware = (req, res, next) => {
    let user = verifyToken(req.headers.authorization);
    if(user){
        req.userId = user._id;
        req.user = user;
        next();
    } else {
        res.send({message: 'Not authenticated', status: 0});
    }
};

module.exports = {
    dataRouteMiddleware
};