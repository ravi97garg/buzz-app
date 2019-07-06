const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;
const {reaction} = require('../constants');

const ReactionSchema = new Schema({
    reactionType : {
        type: String,
        enum:[
            reaction.HAPPY,
            reaction.ANGRY,
            reaction.SAD
        ],
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