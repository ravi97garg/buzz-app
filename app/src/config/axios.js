import axios from 'axios';
import {BASE_URL} from './index';
import {getToken} from '../utilities';
import store from '../store';
import {USER_LOGOUT_SUCCESS} from "../constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,

});

// Axios Interceptors

axiosInstance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error);
    if(error.response.status === 401){
        localStorage.removeItem('Token');
        store.dispatch({type: USER_LOGOUT_SUCCESS});
    }
    return Promise.reject(error);
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    console.log(`token: ${token}`);
    config.headers.Authorization = token;
    return config;
});


export default axiosInstance;