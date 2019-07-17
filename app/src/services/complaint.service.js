import axiosInstance from "../config/axios";
import {
    addComplaintFailed,
    addComplaintStarted, addComplaintSuccess, changeFilterSuccess,
    initComplaintFailed,
    initComplaintStarted,
    initComplaintSuccess, setComplaintStatusDefault
} from "../actions/complaint.action";

export const getDepartments = () => {
    return axiosInstance.get('/data/complaint/getDepartments');
};

export const createComplaint = (complaint) => (dispatch) => {
    dispatch(addComplaintStarted());
    axiosInstance.post('/data/complaint/postComplaint', complaint)
        .then((res) => {
            dispatch(addComplaintSuccess(res.newComplaint));
        })
        .catch((err) => {
            dispatch(addComplaintFailed());
        })
};

export const getMyComplaintsBrief = (options) => (dispatch) => {
    dispatch(initComplaintStarted());
    axiosInstance.get('/data/complaint/getMyComplaint',
        {
            params: {
                type: 'brief',
                ...options
            }
        })
        .then((res) => {
            dispatch(initComplaintSuccess({complaints: res.complaints, complaintsCount: res.complaintsCount}))
        })
        .catch((err) => {
            dispatch(initComplaintFailed());
        })
};

export const changeFilter = (complaintFilter) => (dispatchEvent) => {
    dispatchEvent(changeFilterSuccess(complaintFilter));
};

export const setComplaintStatusDefaultService = () => (dispatchEvent) => {
    dispatchEvent(setComplaintStatusDefault());
};

export const getMyComplaintsDetailed = (uid) => {
    return axiosInstance.get(`/data/complaint/getMyComplaint?type=detailed&uid=${uid}`)
};
