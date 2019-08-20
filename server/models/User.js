const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {adminDepartments, userRoles, activeStatus} = require('../constants');

const UserSchema = new Schema({
    googleId : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    role : {
        type: String,
        enum: [
            userRoles.USER,
            userRoles.ADMIN,
            userRoles.SUPER_ADMIN
        ],
        default: userRoles.USER,
        required: true
    },
    profileImage : {
        type: String,
        required: true
    },
    department : {
        type: String,
        enum: [
            adminDepartments.HR,
            adminDepartments.IT,
            adminDepartments.OTHERS
        ],
        required: true
    },
    provider : {
        type: String,
        required: true
    },
    activeStatus : {
        type: String,
        enum: [
            activeStatus.ACTIVE,
            activeStatus.DEACTIVE
        ],
        required: true,
        default: activeStatus.ACTIVE
    },
    // complaintsCount : {
    //     type:
    // }
});

module.exports = mongoose.model('User', UserSchema);