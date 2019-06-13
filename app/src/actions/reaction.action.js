const setReactionAction = (reactionObj) => {
    return {
        type: 'SET_REACTION',
        payload: {
            ...reactionObj
        }
    }
};

const unsetReactionAction = (reactionObj) => {
    return {
        type: 'UNSET_REACTION',
        payload: {
            ...reactionObj
        }
    }
};

const updateReactionAction = (reactionObj, newReaction) => {
    return {
        type: 'UPDATE_REACTION',
        payload: {
            ...reactionObj,
            newReaction
        }
    }
};


export const reactionAction = (action, reactionObj, newReaction) => (dispatch) => {
    switch (action) {
        case 1:
            dispatch(setReactionAction(reactionObj));
            break;
        case 0:
            dispatch(updateReactionAction(reactionObj, newReaction));
            break;
        case -1:
            dispatch(unsetReactionAction(reactionObj));
            break;
        default:
    }

};
