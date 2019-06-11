const initialState = {};

const complaint = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_COMPLAINT':
            return {...state, ...action.payload};

        default:
            return {...state};
    }
};

export default complaint;