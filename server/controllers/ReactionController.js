const {
    createReaction,
    getReaction,
    updateReaction,
    deleteReaction
} = require("../services/reaction.service");

const handleReaction = (req, res) => {
    const {buzzId, reactionType} = req.body;
    getReaction(buzzId, req.userId)
        .then((reactionObj) => {
            if (reactionObj) {
                if (reactionObj.reactionType === reactionType) {
                    deleteReaction(reactionObj._id)
                        .then(() => res.send({
                                message: 'Reaction deleted',
                                status: 1,
                                action: -1,
                                reactionObj
                            }
                        ))
                        .catch((err) => {
                            res.status(400).send({message: err, status: 2});
                        });
                } else {
                    updateReaction(reactionObj._id, reactionType)
                        .then(() => res.send({
                                message: 'Reaction updated', status: 1, action: 0, reactionObj
                            }
                        ))
                        .catch((err) => {
                            res.status(400).send({message: err, status: 2});
                        });
                }
            } else {
                createReaction({reactionPostId: buzzId, reactedBy: req.userId, reactionType})
                    .then((reactionObj) => res.send({
                            message: 'Reaction created', status: 1, action: 1, reactionObj
                        }
                    ))
                    .catch((err) => {
                        res.status(400).send({message: err, status: 2});
                    });
            }
        })
};

module.exports = {
    handleReaction
};