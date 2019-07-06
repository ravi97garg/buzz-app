const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const {adminDepartments, complaintStatus} = require('../constants');

const ComplaintSchema = new Schema({
    department: {
        type: String,
        enum: [
            adminDepartments.HR,
            adminDepartments.IT,
            adminDepartments.OTHERS
        ],
        default: adminDepartments.OTHERS,
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
        ref: User
    },
    status: {
        type: String,
        enum: [
            complaintStatus.PENDING,
            complaintStatus.INPROGRESS,
            complaintStatus.COMPLETED,
            complaintStatus.CLOSED
        ],
        required: true,
        default: complaintStatus.PENDING
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);