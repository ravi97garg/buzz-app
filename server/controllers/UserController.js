const jwt = require("jsonwebtoken");
const {changeProfileService} = require("../services/user.service");
const {dataUri} = require("../config/multer.config");
const PRIVATE_KEY = require('../constants').JWT_KEY;
const {uploader} = require('../config/cloudinary.config');
const {findUserByEmail} = require('../services/user.service');

const authenticateUser = (req, res) => {
    jwt.verify(req.params.token, PRIVATE_KEY, function (err, decoded) {
        if (err) {
            res.status(401).send({message: err})
        } else {
            findUserByEmail(decoded.email).then((user) => {
                res.send(user);
            }).catch((err) => {
                res.status(401).send({message: err})
            })
        }
    });
};

const changeUserProfile = async (req, res) => {
    try {
        req.profileImage = await uploader.upload(dataUri(req.files[0]).content);
        req.user.profileImage = req.profileImage.secure_url;
        changeProfileService(req.userId, req.user.profileImage)
            .then((output) => {
                jwt.sign(req.user, PRIVATE_KEY,
                    function (err, token) {
                        if (err) {
                            res.status(401).send({message: err, status: 0});
                        } else {
                            res.send({
                                message: 'updated profile image',
                                status: 1,
                                imageUrl: req.user.profileImage,
                                token
                            })
                        }
                    });

            })
            .catch((err) => {
                res.status(400).send({message: err, status: 2});
            })
    } catch (err) {
        res.status(400).send({message: err, status: 3});
    }

};


module.exports = {
    authenticateUser,
    changeUserProfile
};