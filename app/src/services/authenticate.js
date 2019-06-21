import axiosInstance from "../config/axios";


export const authenticateToken = (token) => {
    return axiosInstance.post('/authenticate', {
        token: token
    })

};

export const changeProfileService = (formData) => {
    return axiosInstance.post('/changeProfile', formData)
};