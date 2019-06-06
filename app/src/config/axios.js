import axios from 'axios';
import {BASE_URL} from './index';
import {getToken} from '../utilities';

const axiosInstance = axios.create({
    baseURL: BASE_URL,

});

// Axios Interceptors

// (function() {
//     const token = getToken();
//     console.log('=========',token);
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = token;
//     } else {
//         axios.defaults.headers.common['Authorization'] = null;
//     }
// })();

axiosInstance.interceptors.response.use((response) => {
    console.log(response.data);
    if(response.data.status === 0){
        console.log('hi I arrived here');
        localStorage.removeItem('Token');
    }
    return response.data;
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    config.headers.Authorization = token;
    console.log("hi", config.headers.Authorization);
    return config;
});


export default axiosInstance;