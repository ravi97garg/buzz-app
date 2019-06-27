import axiosInstance from "../config/axios";
import {
    changeProfileImageFailed,
    changeProfileImageStarted, changeProfileImageSuccess,
    fetchUserFailed,
    fetchUserStarted,
    fetchUserSuccess,
    logOutUserSuccess
} from "../actions/user.action";
import {getToken, setToken} from "../utilities";


export const authenticateToken = (token) => {
    return axiosInstance.post('/authenticate', {
        token: token
    })
};

export const changeProfileImageService = (formData) => (dispatch) => {
    dispatch(changeProfileImageStarted());
    axiosInstance.post('/changeProfile', formData)
        .then((res) => {
            setToken(res.token);
            dispatch(changeProfileImageSuccess(res.imageUrl))
        })
        .catch((err) => {
            console.error(err);
            dispatch(changeProfileImageFailed());
        })
};

export const createUser = () => (dispatch) => {
    if (getToken()) {
        dispatch(fetchUserStarted());
        axiosInstance.post('/authenticate', {token: getToken()})
            .then((user) => {
                console.log('reached here with', JSON.stringify(user));
                dispatch(fetchUserSuccess(user));
            })
            .catch((err) => {
                console.error(err);
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