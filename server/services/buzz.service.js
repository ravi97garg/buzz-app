const Buzz = require('../models/Buzz');
const Reaction = require('../models/Reaction');
const Comment = require('../models/Comment');

const createBuzzService = (buzzData) => {
    // Buzz.findOneAndUpdate(
    //     {googleId: profile.id},
    //     {...user},
    //     {upsert: true, new: true},
    //     (err, user) => {
    //         if(err) {
    //             return done(err);
    //         } else {
    //             user.save();
    //             return done(null, user);
    //         }
    //     }
    // );
    console.log(`buzz: ${JSON.stringify(buzzData)}`);
    var buzz = new Buzz();
    buzz.buzzContent = buzzData.formData.buzzContent;
    buzz.postedBy = buzzData.postedBy;
    buzz.category = buzzData.formData.category;
    buzz.images = buzzData.formData.images;
    return buzz.save();
};

const getBuzzService = (limit, skip) => {
    return Buzz.find({})
        .sort({'postedOn': -1})
        .skip(skip*limit)
        .limit(limit)
        .populate({
            path: 'postedBy',
            populate: {
                path: 'reactions'
            }
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
    getBuzzService,
    getReactionService,
    getCommentService
};
