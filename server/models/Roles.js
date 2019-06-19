const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    department : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Role', RoleSchema);