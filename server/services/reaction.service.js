const Reaction = require('../models/Reaction');

const getReaction = (reactedBy, reactionPostId) => {
    return Reaction.findOne({
        reactedBy: reactedBy,
        reactionPostId: reactionPostId
    })
};

const deleteReaction = (reactionId) => {
    return Reaction.deleteOne({_id: reactionId});
};

const updateReaction = (reactionId, reactionType) => {
    return Reaction.updateOne({_id: reactionId}, {reactionType});
};

const createReaction = (reaction) => {
    const newReaction = new Reaction(reaction);
    return newReaction.save();
};

module.exports = {
    getReaction,
    deleteReaction,
    updateReaction,
    createReaction
};