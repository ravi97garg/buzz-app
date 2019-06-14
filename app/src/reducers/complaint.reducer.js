const initialState = {complaintList: []};

const complaint = (state = initialState, action) => {
    // console.log(` fired ${JSON.stringify(action)}`);
    switch (action.type) {
        case 'INIT_COMPLAINT':
            return {...state, complaintList: action.payload.complaints};

        case 'ADD_COMPLAINT':
            const complaintList = state.complaintList;
            complaintList.push(action.payload);
            return {...state, complaintList};

        default:
            return {...state};
    }
};

export default complaint;