const initialState = {};


const buzz = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_BUZZ':
            const data = action.payload;
            const buzzList = state.buzzList;
            buzzList.push(data);
            return {buzzList};

        default:
            return {...state};
    };
}

export default buzz;