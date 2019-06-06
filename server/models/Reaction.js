const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;
const Buzz = require('./Buzz');

const ReactionSchema = new Schema({
    reactionType : {
        type: String,
        required: true
    },
    reactedBy : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    reactionPostId : {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Reaction', ReactionSchema);