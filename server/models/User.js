const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    profileImage : {
        type: String,
        required: true
    },
    department : {
        type: String,
        required: true
    },
    provider : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);