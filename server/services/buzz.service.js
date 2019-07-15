const Buzz = require('../models/Buzz');
const Reaction = require('../models/Reaction');
const Comment = require('../models/Comment');

const createBuzz = ({buzzContent, postedBy, category, images}) => {
    var buzz = new Buzz();
    buzz.buzzContent = buzzContent;
    buzz.postedBy = postedBy;
    buzz.category = category;
    buzz.images = images;
    return buzz.save();
};

const getNewBuzzs = (uptime) => {
    if (uptime) {
        return Buzz
            .find({postedOn: {$gt: uptime}})
            .sort({'postedOn': -1})
            .populate({
                path: 'postedBy',
            })
    } else {
        return Buzz
            .find()
            .sort({'postedOn': -1})
            .populate({
                path: 'postedBy',
            })
    }

};

const getInitialBuzz = (limit) => {
    return Buzz
        .find()
        .sort({'postedOn': -1})
        .limit(limit + 1)
        .populate({
            path: 'postedBy'
        })
};

const getMoreBuzz = (limit, endTime) => {
    return Buzz.find({
        postedOn: {$lt: endTime}
    })
        .sort({'postedOn': -1})
        .limit(limit + 1)
        .populate({
            path: 'postedBy',
        })
};

const getBuzzByID = (buzzId) => {
    return Buzz.findOne({_id: buzzId})
        .populate({
            path: 'postedBy'
        });
};

const updateBuzzContent = (postId, buzzContent) => {
    return Buzz.updateOne({_id: postId}, {buzzContent: buzzContent});
};

const getReaction = (postId) => {
    return Reaction.find({reactionPostId: postId})
};

const getComment = (postId) => {
    return Comment
        .find({commentPostId: postId})
        .sort({'commentedOn': -1})
        .populate({path: 'commentBy'})
};


module.exports = {
    createBuzz,
    getInitialBuzz,
    getReaction,
    getComment,
    getMoreBuzz,
    getNewBuzzs,
    updateBuzzContent,
    getBuzzByID
};