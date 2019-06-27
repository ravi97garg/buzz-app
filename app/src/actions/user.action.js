import {
    USER_LOGIN_FAILED,
    USER_LOGIN_STARTED,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAILED,
    USER_LOGOUT_STARTED,
    USER_LOGOUT_SUCCESS
} from "../constants";
import {
    CHANGE_PROFILE_IMAGE_FAILED,
    CHANGE_PROFILE_IMAGE_STARTED,
    CHANGE_PROFILE_IMAGE_SUCCESS
} from "../constants/user";

export const fetchUserStarted = () => ({
    type: USER_LOGIN_STARTED
});

export const fetchUserSuccess = (user) => ({
    type: USER_LOGIN_SUCCESS,
    payload: user
});

export const fetchUserFailed = () => ({
    type: USER_LOGIN_FAILED
});

export const logOutUserStarted = () => ({
    type: USER_LOGOUT_STARTED
});

export const logOutUserSuccess = () => ({
    type: USER_LOGOUT_SUCCESS
});

export const logOutUserFailed = () => ({
    type: USER_LOGOUT_FAILED
});

export const changeProfileImageStarted = () => ({
    type: CHANGE_PROFILE_IMAGE_STARTED
});

export const changeProfileImageSuccess = (imageUrl) => ({
    type: CHANGE_PROFILE_IMAGE_SUCCESS,
    imageUrl
});

export const changeProfileImageFailed = () => ({
    type: CHANGE_PROFILE_IMAGE_FAILED
});