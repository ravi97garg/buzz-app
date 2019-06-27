import {
    BUZZ_INIT_FAILED,
    BUZZ_INIT_STARTED,
    BUZZ_INIT_SUCCESS, BUZZ_UPDATE_FAILED, BUZZ_UPDATE_STARTED, BUZZ_UPDATE_SUCCESS, LOAD_MORE_BUZZ_FAILED,
    LOAD_MORE_BUZZ_STARTED,
    LOAD_MORE_BUZZ_SUCCESS, REPORT_BUZZ_FAILED, REPORT_BUZZ_STARTED, REPORT_BUZZ_SUCCESS, SET_BUZZ_STATUS_DEFAULT
} from "../constants";

const createBuzz = (buzz) => ({
    type: 'CREATE_BUZZ',
    payload: buzz
});

export const initBuzzSuccess = (buzzs) => ({
    type: BUZZ_INIT_SUCCESS,
    payload: buzzs
});

export const initBuzzStarted = () => ({
    type: BUZZ_INIT_STARTED
});

export const initBuzzFailed = () => ({
    type: BUZZ_INIT_FAILED
});

export const loadMoreBuzzStarted = () => ({
    type: LOAD_MORE_BUZZ_STARTED
});

export const loadMoreBuzzSuccess = (posts) => ({
    type: LOAD_MORE_BUZZ_SUCCESS,
    payload: posts
});

export const loadMoreBuzzFailed = () => ({
    type: LOAD_MORE_BUZZ_FAILED
});

export const setBuzzStatusDefault = () => ({
    type: SET_BUZZ_STATUS_DEFAULT
});

export const updateBuzzStarted = () => ({
    type: BUZZ_UPDATE_STARTED
});

export const updateBuzzFailed = () => ({
    type: BUZZ_UPDATE_FAILED
});

export const reportBuzzStarted = () => ({
type: REPORT_BUZZ_STARTED
});

export const reportBuzzSuccess = () => ({
type: REPORT_BUZZ_SUCCESS
});

export const reportBuzzFailed = () => ({
type: REPORT_BUZZ_FAILED
});

export const updateBuzzSuccess = (buzzId, buzzContent) => ({
    type: BUZZ_UPDATE_SUCCESS,
    payload: {
        buzzId,
        buzzContent
    }
});

export const createBuzzAction = (buzz) => (dispatch) => {
    console.log(`hell is here ${JSON.stringify(buzz)}`);
    dispatch(createBuzz(buzz));
};
