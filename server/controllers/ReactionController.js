const {updateReactionService} = require("../services/reaction.service");
const {createReactionService} = require("../services/reaction.service");
const {postReactionService} = require("../services/reaction.service");
const {deleteReactionService} = require("../services/reaction.service");

const postReaction = (req, res) => {
    const {buzzId, reactionType} = req.body;
    postReactionService({reactionPostId: buzzId, reactedBy: req.userId})
        .then((reactionObj) => {
            if (reactionObj) {
                if (reactionObj.reactionType === reactionType) {
                    deleteReactionService(reactionObj._id)
                        .then(() => res.send({
                                message: 'Reaction deleted', status: 1, action: -1, reactionObj
                            }
                        ))
                        .catch((err) => {
                            console.error(err);
                            res.status(400).send({message: 'DBError', status: 2});
                        });
                } else {
                    updateReactionService(reactionObj._id, reactionType)
                        .then(() => res.send({
                                message: 'Reaction updated', status: 1, action: 0, reactionObj
                            }
                        ))
                        .catch((err) => {
                            console.error(err);
                            res.status(400).send({message: 'DBError', status: 2});
                        });
                }
            } else {
                createReactionService({reactionPostId: buzzId, reactedBy: req.userId, reactionType})
                    .then((reactionObj) => res.send({
                            message: 'Reaction created', status: 1, action: 1, reactionObj
                        }
                    ))
                    .catch((err) => {
                        console.error(err);
                        res.status(400).send({message: 'DBError', status: 2});
                    });
            }
        })
};

module.exports = {
    postReaction
};