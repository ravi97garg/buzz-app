import axiosInstance from "../config/axios";
import {fetchUserFailed, fetchUserStarted, fetchUserSuccess, logOutUserSuccess} from "../actions/user.action";


export const authenticateToken = (token) => {
    return axiosInstance.post('/authenticate', {
        token: token
    })
};

export const changeProfileService = (formData) => {
    return axiosInstance.post('/changeProfile', formData)
};

export const createUser = () => (dispatch) => {
    if (localStorage.getItem('Token')) {
        dispatch(fetchUserStarted());
        axiosInstance.post('/authenticate', {token: localStorage.getItem('Token')})
            .then((user) => {
                console.log('reached here with', JSON.stringify(user));
                dispatch(fetchUserSuccess(user));
            })
            .catch((err) => {
                dispatch(fetchUserFailed());
            });
    } else {
        dispatch(fetchUserFailed());
    }
};

export const userLoginFailed = () => (dispatch) => {
    dispatch(fetchUserFailed());
};

export const logOutUser = () => (dispatch) => {
    localStorage.clear();
    dispatch(logOutUserSuccess());
};