import {
    STATUS
} from "../constants";
import {
    BUZZ_INIT_FAILED,
    BUZZ_INIT_STARTED,
    BUZZ_INIT_SUCCESS,
    BUZZ_UPDATE_FAILED,
    BUZZ_UPDATE_STARTED,
    BUZZ_UPDATE_SUCCESS,
    CREATE_BUZZ_FAILED,
    CREATE_BUZZ_STARTED,
    CREATE_BUZZ_SUCCESS,
    LOAD_MORE_BUZZ_FAILED,
    LOAD_MORE_BUZZ_STARTED,
    LOAD_MORE_BUZZ_SUCCESS, POST_COMMENT_SUCCESS,
    REACTION_SET_SUCCESS,
    REACTION_UNSET_SUCCESS,
    REACTION_UPDATE_FAILED,
    REACTION_UPDATE_STARTED,
    REACTION_UPDATE_SUCCESS,
    SET_BUZZ_STATUS_DEFAULT,
    UPDATE_LOAD_MORE
} from "../constants/buzz";

const initialState = {buzzList: [], uptime: null, buzzStatus: STATUS.DEFAULT, showLoadMore: false};

const buzz = (state = initialState, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case CREATE_BUZZ_STARTED: {
            return {...state, buzzStatus: CREATE_BUZZ_STARTED}
        }

        case CREATE_BUZZ_SUCCESS: {
            const data = action.payload;
            const buzzList = state.buzzList;
            buzzList.unshift(...data);
            let uptime = data[0].postedOn;
            return {...state, buzzList, uptime, buzzStatus: CREATE_BUZZ_SUCCESS};
        }

        case CREATE_BUZZ_FAILED: {
            return {...state, buzzStatus: CREATE_BUZZ_FAILED};
        }

        case LOAD_MORE_BUZZ_STARTED: {
            return {...state, buzzStatus: STATUS.STARTED}
        }

        case LOAD_MORE_BUZZ_SUCCESS: {
            const data = action.payload;
            let buzzList = state.buzzList;
            buzzList = buzzList.concat(data);
            return {...state, buzzList, buzzStatus: STATUS.SUCCESS};
        }

        case LOAD_MORE_BUZZ_FAILED: {
            return {...state, buzzStatus: STATUS.FAILED};
        }

        case BUZZ_INIT_STARTED: {
            return {...state, buzzStatus: STATUS.STARTED}
        }

        case BUZZ_INIT_SUCCESS: {
            const buzzs = action.payload;
            const uptime = buzzs[0] ? buzzs[0].postedOn : null;
            return {...state, buzzList: buzzs, uptime: uptime, buzzStatus: STATUS.SUCCESS};
        }

        case BUZZ_INIT_FAILED: {
            return {...state, buzzStatus: STATUS.FAILED};
        }

        case UPDATE_LOAD_MORE: {
            return {...state, showLoadMore: action.payload};
        }

        case SET_BUZZ_STATUS_DEFAULT: {
            return {...state, buzzStatus: STATUS.DEFAULT};
        }

        case REACTION_UPDATE_STARTED: {
            return {...state, buzzStatus: REACTION_UPDATE_STARTED}
        }

        case REACTION_SET_SUCCESS: {
            const reactionBuzzIndex = state.buzzList.findIndex(obj => obj._id === action.payload.reactionPostId);
            let buzzs = state.buzzList;
            buzzs[reactionBuzzIndex].reactions.push(action.payload);
            return {...state, buzzList: buzzs, buzzStatus: REACTION_SET_SUCCESS}
        }

        case REACTION_UNSET_SUCCESS: {
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.reactionPostId
            });
            const reactionIndex = state.buzzList[buzzIndex].reactions.findIndex((reaction) => {
                return reaction._id === action.payload._id
            });
            let buzzs = state.buzzList;
            buzzs[buzzIndex].reactions.splice(reactionIndex, 1);
            return {...state, buzzList: buzzs, buzzStatus: REACTION_UNSET_SUCCESS}
        }

        case REACTION_UPDATE_SUCCESS: {
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.reactionPostId
            });
            const reactionIndex = state.buzzList[buzzIndex].reactions.findIndex((reaction) => {
                return reaction._id === action.payload._id
            });
            let buzzs = state.buzzList;
            buzzs[buzzIndex].reactions[reactionIndex].reactionType = action.payload.newReaction;
            return {...state, buzzList: buzzs, buzzStatus: REACTION_UPDATE_SUCCESS}
        }

        case REACTION_UPDATE_FAILED: {
            return {...state, buzzStatus: REACTION_UPDATE_FAILED}
        }

        case POST_COMMENT_SUCCESS: {
            let buzzs = [...state.buzzList];
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.postId
            });
            buzzs[buzzIndex].comments.push(action.payload);
            return {...state, buzzList: buzzs};
        }

        case BUZZ_UPDATE_STARTED: {
            return {...state, buzzStatus: BUZZ_UPDATE_STARTED}
        }

        case BUZZ_UPDATE_SUCCESS: {
            let buzzs = [...state.buzzList];
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.buzzId
            });
            buzzs[buzzIndex].buzzContent = action.payload.buzzContent;
            return {...state, buzzList: buzzs, buzzStatus: BUZZ_UPDATE_SUCCESS};
        }

        case BUZZ_UPDATE_FAILED: {
            return {...state, buzzStatus: BUZZ_UPDATE_FAILED}
        }

        default:
            return state;
    }
};

export default buzz;