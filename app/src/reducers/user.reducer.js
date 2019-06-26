import {STATUS, USER_LOGIN_FAILED, USER_LOGIN_STARTED, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS} from "../constants";

const initialState = {_id: '', name: '', email: '', role: '', profileImage: '', department: '', currentStatus: STATUS.DEFAULT};

const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_STARTED: {
            return {...state,
                currentStatus:STATUS.STARTED}
        }

        case USER_LOGIN_SUCCESS: {
            return {...state,
                ...action.payload,
                currentStatus: STATUS.SUCCESS};
        }

        case USER_LOGIN_FAILED: {
            return {...state,
                currentStatus: STATUS.FAILED}
        }

        case USER_LOGOUT_SUCCESS: {
            return {_id: '',
                name: '',
                email: '',
                role: '',
                profileImage: '',
                department: '',
                currentStatus: STATUS.DEFAULT};
        }

        case 'CHANGE_PROFILE_IMAGE':
            return {...state,
                profileImage: action.imageUrl};

        default:
            return state;
    }
};

export default user;