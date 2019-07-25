import {
    CHANGE_USER_STATUS_FAILED,
    CHANGE_USER_STATUS_STARTED, CHANGE_USER_STATUS_SUCCESS,
    FETCH_ALL_USERS_FAILED,
    FETCH_ALL_USERS_STARTED,
    FETCH_ALL_USERS_SUCCESS
} from "../constants/superadmin";

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

export const changeUserStatusStarted = () => ({
    type: CHANGE_USER_STATUS_STARTED
});

export const changeUserStatusSuccess = (userId, status, role) => ({
    type: CHANGE_USER_STATUS_SUCCESS,
    payload: {
        userId,
        status,
        role
    }
});

export const changeUserStatusFailed = () => ({
    type: CHANGE_USER_STATUS_FAILED
});