const initialState = {name: '', email: '', role: '', profileImage: '', department: ''};

const user = (state = initialState, action) => {
    console.log(`paay load receievd ${JSON.stringify(action)}`);
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return {...state, ...action.payload}

        case 'USER_LOGGED_OUT':
                    return {...state}

        default:
            return {...state};
    }
};

export default user;