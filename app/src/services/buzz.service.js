import axiosInstance from "../config/axios";

export const createBuzzService = (formData) => {
    console.log(`formData ${JSON.stringify(formData)}`);
    axiosInstance.post('/data/buzz/createBuzz', {
        formData
    })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })


};

export const getBuzzService = (limit, skip) => {
    return axiosInstance.post('/data/buzz/getBuzz', {
        limit, skip
    })
};