import axiosInstance from "../config/axios";
import {
    setReactionAction,
    unsetReactionAction,
    updateReactionAction,
    updateReactionFailed,
    updateReactionStarted
} from "../actions/reaction.action";


const reactionAction = (action, reactionObj, newReaction) => {
    switch (action) {
        case 1:
            return setReactionAction(reactionObj);
        case 0:
            return updateReactionAction(reactionObj, newReaction);
        case -1:
            return unsetReactionAction(reactionObj);
        default:
    }

};


export const reactionService = (buzzId, reactionType) => (dispatch) => {
    dispatch(updateReactionStarted());
    axiosInstance.post('/data/buzz/handleReaction', {
        buzzId,
        reactionType
    })
        .then((res) => {
            dispatch(reactionAction(res.action, res.reactionObj, reactionType));
        })
        .catch((err) => {
            console.error(err);
            dispatch(updateReactionFailed());
        })
};