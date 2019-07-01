const jwt = require("jsonwebtoken");
const {changeProfileService} = require("../services/user.service");
const {dataUri} = require("../config/multer.config");
const PRIVATE_KEY = require('../constants').JWT_KEY;
const {uploader} = require('../config/cloudinary.config');

const authenticateUser = (req, res) => {
    if (req.body.token) {
        jwt.verify(req.body.token, PRIVATE_KEY, function (err, decoded) {
            if (err) {
                console.error(err);
                res.status(400).send({message: 'error while verifying in authenticate', status: 0})
            } else {
                res.send(decoded);
            }
        });
    } else {
        res.status(400).send({message: 'error while verifying in authenticate', status: 0});
    }

};

const changeUserProfile = async (req, res) => {
    if (req.files[0]) {
        try {
            let base64file = dataUri(req.files[0]).content;
            req.profileImage = await uploader.upload(base64file);
            req.user.profileImage = req.profileImage.secure_url;
            changeProfileService(req.userId, req.user.profileImage).then((output) => {
                console.log(`output: ${JSON.stringify(output)}`);
                jwt.sign(req.user, PRIVATE_KEY,
                    function(err, token) {
                        if(err){
                            console.error(`err: ${err}`);
                            res.status(400).send({message: 'Not Authenticated', status: 0});
                        } else {
                            res.send({
                                message: 'updated profile image',
                                status: 1,
                                imageUrl: req.user.profileImage,
                                token
                            })
                        }
                    });

            }).catch((err) => {
                console.error(err);
                res.status(400).send({message: 'DBError', status: 2});
            })
        } catch (e) {
            console.error(e);
            res.status(400).send({message: 'UploadError', status: 3});
        }
    } else {
        res.status(400).send({message: 'UploadError', status: 3});
    }
};


module.exports = {
    authenticateUser,
    changeUserProfile
};