const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const {buzzCategory} = require('../constants');


const BuzzSchema = new Schema({
    buzzContent: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            buzzCategory.ACTIVITY,
            buzzCategory.LOSTFOUND
        ],
        default: buzzCategory.ACTIVITY,
        required: true
    },
    images: {
        type: [String]
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Buzz', BuzzSchema);