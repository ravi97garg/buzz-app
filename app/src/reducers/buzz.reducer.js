const initialState = {buzzList: [], uptime: null};

const buzz = (state = initialState, action) => {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case 'CREATE_BUZZ': {
            const data = action.payload;
            const buzzList = state.buzzList;
            buzzList.unshift(...data);
            let uptime = data[0].postedOn;
            return {...state, buzzList, uptime};
        }

        case 'PUSH_BUZZ': {
            const data = action.payload;
            let buzzList = state.buzzList;
            buzzList = buzzList.concat(data);
            return {...state, buzzList};
        }

        case 'INIT_BUZZ': {
            const buzzs = action.payload;
            const uptime = buzzs[0] ? buzzs[0].postedOn : null;
            return {...state, buzzList: buzzs, uptime: uptime};
        }

        case 'SET_REACTION': {
            const reactionBuzzIndex = state.buzzList.findIndex(obj => obj._id === action.payload.reactionPostId);
            let buzzs = state.buzzList;
            buzzs[reactionBuzzIndex].reactions.push(action.payload);
            return {...state, buzzList: buzzs}
        }

        case 'UNSET_REACTION': {
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.reactionPostId
            } );
            const reactionIndex = state.buzzList[buzzIndex].reactions.findIndex((reaction) => {
                return reaction._id === action.payload._id
            });
            let buzzs = state.buzzList;
            buzzs[buzzIndex].reactions.splice(reactionIndex, 1);
            return {...state, buzzList: buzzs}
        }

        case 'UPDATE_REACTION': {
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.reactionPostId
            } );
            const reactionIndex = state.buzzList[buzzIndex].reactions.findIndex((reaction) => {
                return reaction._id === action.payload._id
            });
            let buzzs = state.buzzList;
            buzzs[buzzIndex].reactions[reactionIndex].reactionType = action.payload.newReaction;
            return {...state, buzzList: buzzs}
        }

        case 'POST_COMMENT': {
            let buzzs = [...state.buzzList];
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.commentPostId
            } );
            buzzs[buzzIndex].comments.push(action.payload);
            return {...state, buzzList: buzzs};
        }

        case 'UPDATE_BUZZ': {
            console.log(`reached here ${JSON.stringify(action.payload)}`);
            let buzzs = [...state.buzzList];
            const buzzIndex = state.buzzList.findIndex((obj) => {
                return obj._id === action.payload.buzzId
            } );
            buzzs[buzzIndex].buzzContent = action.payload.buzzContent;
            return {...state, buzzList: buzzs};
        }

        default:
            return state;
    }
};

export default buzz;