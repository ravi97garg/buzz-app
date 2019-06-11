const initialState = {buzzList: [], uptime: null};

const buzz = (state = initialState, action) => {
    console.log(action.type, action.payload);
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
            const newState = {...state, buzzList: buzzs};
            console.log(newState);
            const uptime = buzzs[0].postedOn;
            return {...state, buzzList: buzzs, uptime: uptime};
        }

        default:
            return {...state};
    }
};

export default buzz;