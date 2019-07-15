const { config, uploader } = require('cloudinary');
const {CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = require('../constants');

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    });
    next();
};

module.exports = {
    cloudinaryConfig,
    uploader
};