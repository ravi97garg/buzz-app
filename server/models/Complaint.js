const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Roles = require('./Roles');

const ComplaintSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    complaintContent: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    },
    loggedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Roles
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);