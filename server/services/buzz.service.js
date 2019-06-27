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
            })
    } else {
        return Buzz.find()
            .sort({'postedOn': -1})
            .populate({
                path: 'postedBy',
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

const getBuzzByID = (buzzId) => {
    return Buzz.findOne({_id: buzzId})
        .populate({
            path: 'postedBy'
        });
};

const updateBuzzContentService = (postId, buzzContent) => {
    return Buzz.updateOne({_id: postId}, {buzzContent: buzzContent});
};

const getReactionService = (postId) => {
    return Reaction.find({reactionPostId: postId})
};

const getCommentService = (postId) => {
    return Comment.find({commentPostId: postId}).populate({path: 'commentBy'})
};


module.exports = {
    createBuzzService,
    getInitialBuzzService,
    getReactionService,
    getCommentService,
    getMoreBuzzService,
    getNewBuzzs,
    updateBuzzContentService,
    getBuzzByID
};

// comments.forEach(comment => {
//     // comment.populate({path: 'commentedBy'})
//
//     User.findOne({_id: comment.commentedBy}).then((user))
// })