const jwt = require("jsonwebtoken");

const {
    changeProfileService,
    findUserByEmail
} = require("../services/user.service");
const {dataUri} = require("../config/multer.config");
const {JWT_KEY} = require('../constants');
const {uploader} = require('../config/cloudinary.config');

const authenticateUser = (req, res) => {
    jwt.verify(req.params.token, JWT_KEY, function (err, decoded) {
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
            .then(() => {
                jwt.sign(req.user, JWT_KEY,
                    function (err, token) {
                        if (err) {
                            res.status(401).send({message: err});
                        } else {
                            res.send({
                                message: 'updated profile image',
                                imageUrl: req.user.profileImage,
                                token
                            })
                        }
                    });

            })
            .catch((err) => {
                res.status(400).send({message: err});
            })
    } catch (err) {
        res.status(400).send({message: err});
    }

};


module.exports = {
    authenticateUser,
    changeUserProfile
};