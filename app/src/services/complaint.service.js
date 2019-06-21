import axiosInstance from "../config/axios";

export const getDepartments = () => {
    return axiosInstance.get('/data/complaint/getDepartments');
};

export const createComplaint = (complaint) => {
    return axiosInstance.post('/data/complaint/postComplaint', complaint);
};

export const getMyComplaintsBrief = () => {
    return axiosInstance.get('/data/complaint/getMyComplaint?type=brief')
};

export const getMyComplaintsDetailed = (id) => {
    return axiosInstance.get(`/data/complaint/getMyComplaint?type=detailed&id=${id}`)
};