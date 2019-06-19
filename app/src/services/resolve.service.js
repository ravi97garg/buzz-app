import axiosInstance from "../config/axios";

export const getInitialComplaints = () => {
    return axiosInstance.get('/data/resolve/getInitComplaints');
};

export const getNewComplaints = (uptime) => {
    return axiosInstance.post('/data/resolve/getNewComplaints', {
        uptime
    });
};

export const loadMoreComplaints = (downtime) => {
    return axiosInstance.post('/data/resolve/loadMoreComplaints', {
        limit : 10,
        downtime
    });
};

export const changeStatus = (complaintId, status) => {
    return axiosInstance.post('/data/resolve/changeStatus', {
        complaintId,
        status
    })
}