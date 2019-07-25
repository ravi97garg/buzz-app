import {STATUS} from '../constants';
import {
    CHANGE_USER_STATUS_FAILED,
    CHANGE_USER_STATUS_STARTED, 
    CHANGE_USER_STATUS_SUCCESS,
    FETCH_ALL_USERS_FAILED,
    FETCH_ALL_USERS_STARTED,
    FETCH_ALL_USERS_SUCCESS
} from '../constants/superadmin';

const initialState = {
    users: [],
    fetchStatus: STATUS.DEFAULT,
    userStatus: STATUS.DEFAULT
};

const superuser = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_ALL_USERS_STARTED: {
            return {...state, fetchStatus: STATUS.STARTED}
        }

        case FETCH_ALL_USERS_SUCCESS: {
            return {...state, fetchStatus: STATUS.SUCCESS, users: action.payload.users};
        }

        case FETCH_ALL_USERS_FAILED: {
            return {...state, fetchStatus: STATUS.FAILED}
        }

        case CHANGE_USER_STATUS_STARTED: {
            return {...state, userStatus: STATUS.STARTED}
        }

        case CHANGE_USER_STATUS_FAILED: {
            return {...state, userStatus: STATUS.FAILED}
        }

        case CHANGE_USER_STATUS_SUCCESS: {
            const {
                userId,
                status,
                role
            } = action.payload;
            let updatedUsers = [...state.users];
            updatedUsers = updatedUsers.map((item) => {
                return item._id === userId ? {...item, activeStatus: status, role} : item
            });
            return {...state, userStatus: STATUS.SUCCESS, users: updatedUsers}
        }

        default: {
            return state;
        }
    }
};

export default superuser;