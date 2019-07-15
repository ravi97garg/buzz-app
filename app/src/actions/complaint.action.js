import {
    ADD_COMPLAINT_FAILED,
    ADD_COMPLAINT_STARTED,
    ADD_COMPLAINT_SUCCESS,
    INIT_COMPLAINT_FAILED,
    INIT_COMPLAINT_STARTED,
    INIT_COMPLAINT_SUCCESS, SET_COMPLAINT_STATUS_DEFAULT
} from "../constants/complaints";

export const initComplaintStarted = () => ({
    type: INIT_COMPLAINT_STARTED
});

export const initComplaintSuccess = ({complaints, complaintsCount}) => ({
    type: INIT_COMPLAINT_SUCCESS,
    payload: {complaints, complaintsCount}
});

export const initComplaintFailed = () => ({
    type: INIT_COMPLAINT_FAILED
});

export const addComplaintStarted = () => ({
    type: ADD_COMPLAINT_STARTED
});

export const addComplaintSuccess = (complaint) => ({
    type: ADD_COMPLAINT_SUCCESS,
    payload: {complaint}
});

export const addComplaintFailed = () => ({
    type: ADD_COMPLAINT_FAILED
});

export const setComplaintStatusDefault = () => ({
    type: SET_COMPLAINT_STATUS_DEFAULT
});