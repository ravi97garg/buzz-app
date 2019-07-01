import axiosInstance from "../config/axios";
import {
    addComplaintFailed,
    addComplaintStarted, addComplaintSuccess,
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

export const getMyComplaintsBrief = () => (dispatch) => {
    dispatch(initComplaintStarted());
    axiosInstance.get('/data/complaint/getMyComplaint?type=brief')
        .then((res) => {
            dispatch(initComplaintSuccess(res.complaints))
        })
        .catch((err) => {
            dispatch(initComplaintFailed());
        })
};

export const setComplaintStatusDefaultService = () => (dispatchEvent) => {
    dispatchEvent(setComplaintStatusDefault());
};

export const getMyComplaintsDetailed = (id) => {
    return axiosInstance.get(`/data/complaint/getMyComplaint?type=detailed&id=${id}`)
};