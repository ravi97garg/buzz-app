import axiosInstance from "../config/axios";
import {
    assignResolveFailed,
    assignResolveStarted, assignResolveSuccess,
    getInitComplaintsFailed,
    getInitComplaintsStarted,
    getInitComplaintsSuccess,
    getMyResolvesFailed,
    getMyResolvesStarted,
    getMyResolvesSuccess,
    setResolveStatusDefault,
    updateComplaintStatusFailed,
    updateComplaintStatusStarted,
    updateComplaintStatusSuccess
} from "../actions/resolve.action";

export const getInitialComplaints = () => (dispatchEvent) => {
    dispatchEvent(getInitComplaintsStarted());
    axiosInstance.get('/data/resolve/getInitComplaints')
        .then((data) => {
            dispatchEvent(getInitComplaintsSuccess(data.complaints));
        })
        .catch((err) => {
            console.error(err);
            dispatchEvent(getInitComplaintsFailed());
        })
};

export const getMyDeptResolves = () => (dispatch) => {
    dispatch(getMyResolvesStarted());
    axiosInstance.get(`/data/resolve/getMyDeptResolves`)
        .then((data) => {
            dispatch(getMyResolvesSuccess(data.complaints));
        })
        .catch((err) => {
            console.error(err);
            dispatch(getMyResolvesFailed())
        })
};

export const getNewComplaints = (uptime) => {
    return axiosInstance.post('/data/resolve/getNewComplaints', {
        uptime
    });
};

export const loadMoreComplaints = (downtime) => {
    return axiosInstance.post('/data/resolve/loadMoreComplaints', {
        limit: 10,
        downtime
    });
};

export const changeStatus = (complaintId, status) => (dispatchEvent) => {
    dispatchEvent(updateComplaintStatusStarted());
    axiosInstance.post('/data/resolve/changeStatus', {
        complaintId,
        status
    })
        .then((res) => {
            console.log(res);
            dispatchEvent(updateComplaintStatusSuccess(complaintId, status));
        })
        .catch((err) => {
            console.error(err);
            dispatchEvent(updateComplaintStatusFailed());
        })
};

export const assignResolveService = (resolveId, user) => (dispatchEvent) => {
    dispatchEvent(assignResolveStarted());
    axiosInstance.get(`/data/resolve/assignResolve/${resolveId}`)
        .then(() => {
            dispatchEvent(assignResolveSuccess(user));
        })
        .catch(() => {
            dispatchEvent(assignResolveFailed());
        })
}

export const setResolveStatusDefaultAction = () => (dispatchEvent) => {
    dispatchEvent(setResolveStatusDefault());
};