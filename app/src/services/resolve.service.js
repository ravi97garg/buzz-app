import axiosInstance from "../config/axios";
import {
    assignResolveFailed,
    assignResolveStarted,
    assignResolveSuccess,
    getInitComplaintsFailed,
    getInitComplaintsStarted,
    getInitComplaintsSuccess,
    setResolveStatusDefault,
    updateComplaintStatusFailed,
    updateComplaintStatusStarted,
    updateComplaintStatusSuccess
} from "../actions/resolve.action";

export const getResolves = (options) => (dispatchEvent) => {
    dispatchEvent(getInitComplaintsStarted());
    let hitUrl = '/data/resolve/getComplaints';
    if(options && options.department){
        hitUrl += `/${options.department}`
    }
    axiosInstance.get(hitUrl,
        {
            params: {
                ...options
            }
        }
    )
        .then((data) => {
            const {
                complaints,
                complaintsCount
            } = data;
            dispatchEvent(getInitComplaintsSuccess(complaints, complaintsCount));
        })
        .catch((err) => {
            console.error(err);
            dispatchEvent(getInitComplaintsFailed());
        })
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
            dispatchEvent(assignResolveSuccess(resolveId, user));
        })
        .catch((err) => {
            console.log(err);
            dispatchEvent(assignResolveFailed());
        })
};

export const setResolveStatusDefaultAction = () => (dispatchEvent) => {
    dispatchEvent(setResolveStatusDefault());
};