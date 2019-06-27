import axiosInstance from "../config/axios";
import {
    initBuzzFailed,
    initBuzzStarted,
    initBuzzSuccess,
    loadMoreBuzzFailed,
    loadMoreBuzzStarted,
    loadMoreBuzzSuccess, reportBuzzFailed,
    reportBuzzStarted,
    reportBuzzSuccess,
    setBuzzStatusDefault,
    updateBuzzFailed,
    updateBuzzStarted,
    updateBuzzSuccess
} from "../actions/buzz.action";
import {UPDATE_LOAD_MORE} from "../constants";

export const createBuzzService = (formData) => {
    return axiosInstance.post('/data/buzz/createBuzz', formData);
};

export const getInitialBuzzService = (limit) => (dispatch) => {
    dispatch(initBuzzStarted());
    axiosInstance.post('/data/buzz/getInitialBuzz', {
        limit
    })
        .then((buzzs) => {
            if (buzzs.extractedBuzzs.length > limit) {
                dispatch({type: UPDATE_LOAD_MORE, payload: true});
            } else {
                // dispatch({type: UPDATE_LOAD_MORE, payload: false})
            }
            const posts = buzzs.extractedBuzzs.slice(0, limit);
            dispatch(initBuzzSuccess(posts));
        })
        .catch((err) => {
            console.error(err);
            dispatch(initBuzzFailed());
        });

};

export const setBuzzStatusDefaultAction = () => (dispatchEvent) => {
    dispatchEvent(setBuzzStatusDefault());
};

export const getMoreBuzzService = (limit, endTime) => (dispatch) => {
    // console.log('getting called');
    dispatch(loadMoreBuzzStarted());
    axiosInstance.post('/data/buzz/getMoreBuzz', {
        limit,
        endTime
    })
        .then((buzzs) => {
            if (buzzs.extractedBuzzs.length > limit) {
                dispatch({type: UPDATE_LOAD_MORE, payload: true});
            } else {
                dispatch({type: UPDATE_LOAD_MORE, payload: false})
            }
            const posts = buzzs.extractedBuzzs.slice(0, limit);
            dispatch(loadMoreBuzzSuccess(posts));
        })
        .catch((err) => {
            dispatch(loadMoreBuzzFailed());
        });
};

export const updateBuzzContent = (buzzId, buzzContent) => (dispatch) => {
    dispatch(updateBuzzStarted());
    axiosInstance.post('/data/buzz/updateBuzz', {
        buzzId,
        buzzContent
    })
        .then((res) => {
            console.log(res);
            dispatch(updateBuzzSuccess(buzzId, buzzContent));
        })
        .catch((err) => {
            console.error(err);
            dispatch(updateBuzzFailed())
        })
};

export const reportBuzz = (buzzId) => (dispatch) => {
    dispatch(reportBuzzStarted());
    axiosInstance.post('/data/buzz/report', {
        buzzId
    })
        .then((res) => {
            dispatch(reportBuzzSuccess());
        })
        .catch((err) => {
            dispatch(reportBuzzFailed());
        })
};