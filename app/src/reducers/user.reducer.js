const initialState = {_id: '', name: '', email: '', role: '', profileImage: '', department: ''};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            return {...state, ...action.payload};

        case 'USER_LOGGED_OUT':
            return {_id: '', name: '', email: '', role: '', profileImage: '', department: ''};

        case 'CHANGE_PROFILE_IMAGE':
            return {...state, profileImage: action.imageUrl};

        default:
            return {...state};
    }
};

export default user;