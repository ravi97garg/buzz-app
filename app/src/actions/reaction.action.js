import {
    REACTION_SET_SUCCESS,
    REACTION_UNSET_SUCCESS, REACTION_UPDATE_FAILED,
    REACTION_UPDATE_STARTED,
    REACTION_UPDATE_SUCCESS
} from "../constants/buzz";

export const setReactionAction = (reactionObj) => {
    return {
        type: REACTION_SET_SUCCESS,
        payload: {
            ...reactionObj
        }
    }
};

export const unsetReactionAction = (reactionObj) => {
    return {
        type: REACTION_UNSET_SUCCESS,
        payload: {
            ...reactionObj
        }
    }
};

export const updateReactionAction = (reactionObj, newReaction) => {
    return {
        type: REACTION_UPDATE_SUCCESS,
        payload: {
            ...reactionObj,
            newReaction
        }
    }
};

export const updateReactionStarted = () => {
    return {
        type: REACTION_UPDATE_STARTED
    }
};

export const updateReactionFailed = () => {
    return {
        type: REACTION_UPDATE_FAILED
    }
};