const mongoose = require('mongoose');
const User = require('./User');
const Buzz = require('./Buzz');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment : {
        type: String,
        required: true
    },
    commentBy : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    commentPostId : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Buzz
    },
    commentedOn : {
        type: Date,
        default: Date.now
    },
    commentEditedOn : {
        type: Date,
        default: null
    },
});

module.exports = mongoose.model('Comment', CommentSchema);
