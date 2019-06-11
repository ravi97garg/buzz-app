import axiosInstance from "../config/axios";

export const getDepartments = () => {
    return axiosInstance.get('/data/complaint/getDepartments')
};