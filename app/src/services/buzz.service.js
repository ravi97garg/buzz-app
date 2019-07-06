import axiosInstance from "../config/axios";
import {
    createBuzzFailed,
    createBuzzStarted, createBuzzSuccess,
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
import {UPDATE_LOAD_MORE} from "../constants/buzz";

export const createBuzzService = (formData) => (dispatch) =>{
    dispatch(createBuzzStarted());
    axiosInstance.post('/data/buzz/createBuzz', formData)
        .then((res)=> {
            dispatch(createBuzzSuccess(res.extractedBuzzs))
        })
        .catch((err) => {
            console.error(err);
            dispatch(createBuzzFailed());
        })
};

export const getInitialBuzzService = (limit) => (dispatch) => {
    dispatch(initBuzzStarted());
    axiosInstance.get(`/data/buzz/getBuzz?limit=${limit}`, {
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
    dispatch(loadMoreBuzzStarted());
    axiosInstance.get(`/data/buzz/getBuzz?limit=${limit}&endTime=${endTime}`, {
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
            console.error(err);
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
            console.log(res);
            dispatch(reportBuzzSuccess());
        })
        .catch((err) => {
            console.error(err);
            dispatch(reportBuzzFailed());
        })
};