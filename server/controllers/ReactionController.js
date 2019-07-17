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
                        .then(() =>
                            res.send({
                                    message: 'Reaction deleted',
                                    action: -1,
                                    reactionObj
                                }
                            ))
                        .catch((err) => {
                            res.status(500).send({message: err});
                        });
                } else {
                    updateReaction(reactionObj._id, reactionType)
                        .then(() => res.send({
                                message: 'Reaction updated', action: 0, reactionObj
                            }
                        ))
                        .catch((err) => {
                            res.status(500).send({message: err,});
                        });
                }
            } else {
                createReaction({reactionPostId: buzzId, reactedBy: req.userId, reactionType})
                    .then((reactionObj) =>
                        res.status(201).send({
                                message: 'Reaction created', action: 1, reactionObj
                            }
                        ))
                    .catch((err) => {
                        res.status(500).send({message: err});
                    });
            }
        })
};

module.exports = {
    handleReaction
};