import {
    FETCH_ALL_USERS_FAILED,
    FETCH_ALL_USERS_STARTED,
    FETCH_ALL_USERS_SUCCESS
} from "../constants/user";
import {STATUS} from "../constants";

const initialState = {
    users: [],
    fetchStatus: STATUS.DEFAULT
};

const superuser = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_ALL_USERS_STARTED: {
            return {...state, fetchStatus: STATUS.STARTED, users: action.payload.users}
        }

        case FETCH_ALL_USERS_SUCCESS: {
            return {...state, fetchStatus: STATUS.SUCCESS, users: action.payload.users};
        }

        case FETCH_ALL_USERS_FAILED: {
            return {...state, fetchStatus: STATUS.FAILED}
        }

        default: {
            return state;
        }
    }
};

export default superuser;