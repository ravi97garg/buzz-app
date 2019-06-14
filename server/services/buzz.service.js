const Buzz = require('../models/Buzz');
const Reaction = require('../models/Reaction');
const Comment = require('../models/Comment');

const createBuzzService = (buzzData) => {
    var buzz = new Buzz();
    buzz.buzzContent = buzzData.buzzContent;
    buzz.postedBy = buzzData.postedBy;
    buzz.category = buzzData.category;
    buzz.images = buzzData.images;
    console.log(buzzData);
    return buzz.save();
};

const getNewBuzzs = (uptime) => {
    if (uptime) {
        return Buzz.find({postedOn: {$gt: uptime}})
            .sort({'postedOn': -1})
            .populate({
                path: 'postedBy',
                populate: {
                    path: 'reactions'
                }
            })
    } else {
        return Buzz.find()
            .sort({'postedOn': -1})
            .populate({
                path: 'postedBy',
                populate: {
                    path: 'reactions'
                }
            })
    }

};

const getInitialBuzzService = (limit) => {
    return Buzz.find()
        .sort({'postedOn': -1})
        .limit(limit + 1)
        .populate({
            path: 'postedBy'
        })
};

const getMoreBuzzService = (limit, endTime) => {
    return Buzz.find({
        postedOn: {$lt: endTime}
    })
        .sort({'postedOn': -1})
        .limit(limit + 1)
        .populate({
            path: 'postedBy',

        })
};

const getReactionService = (postId) => {
    return Reaction.find({reactionPostId: postId})
};

const getCommentService = (postId) => {
    return Comment.find({commentPostId: postId})
};


module.exports = {
    createBuzzService,
    getInitialBuzzService,
    getReactionService,
    getCommentService,
    getMoreBuzzService,
    getNewBuzzs
};
