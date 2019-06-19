import axiosInstance from "../config/axios";
// import axios from "axios";

export const createBuzzService = (formData) => {
    return axiosInstance.post('/data/buzz/createBuzz', formData);
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

