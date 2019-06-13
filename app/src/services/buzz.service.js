import axiosInstance from "../config/axios";

export const createBuzzService = (formData, startTime) => {
    return axiosInstance.post('/data/buzz/createBuzz', {
        formData, startTime
    })

};

export const getInitialBuzzService = (limit) => {
    return axiosInstance.post('/data/buzz/getInitialBuzz', {
        limit
    })
};

export const getMoreBuzzs = (limit, endTime) => {
    return axiosInstance.post('/data/buzz/getMoreBuzz', {
        limit,
        endTime
    })
}

