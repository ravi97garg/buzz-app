const Reaction = require('../models/Reaction');

const postReactionService = (reaction) => {
    return Reaction.findOne({reactedBy: reaction.reactedBy, reactionPostId: reaction.reactionPostId})
};

const deleteReactionService = (reactionId) => {
    return Reaction.deleteOne({_id: reactionId});
};

const updateReactionService = (reactionId, reactionType) => {
    return Reaction.updateOne({_id: reactionId}, {reactionType});
};

const createReactionService = (reaction) => {
    const newReaction = new Reaction(reaction);
    return newReaction.save();
}

module.exports = {
    postReactionService,
    deleteReactionService,
    updateReactionService,
    createReactionService
}