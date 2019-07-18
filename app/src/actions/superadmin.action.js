import {
    FETCH_ALL_USERS_FAILED,
    FETCH_ALL_USERS_STARTED,
    FETCH_ALL_USERS_SUCCESS
} from "../constants/user";

export const fetchAllUsersStarted = () => ({
    type: FETCH_ALL_USERS_STARTED
});

export const fetchAllUsersSuccess = (users) => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload: {users}
});

export const fetchAllUsersFailed = () => ({
    type: FETCH_ALL_USERS_FAILED
});