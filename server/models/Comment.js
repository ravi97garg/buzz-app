const mongoose = require('mongoose');
const User = require('./User');
const Buzz = require('./Buzz');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment : {
        type: String,
        required: true
    },
    author : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    postId : {
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
