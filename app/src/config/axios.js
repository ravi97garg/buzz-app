import axios from 'axios';
import {BASE_URL} from './index';
import {getToken} from '../utilities';
import store from '../store';

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
    if(response.data.status === 0){
        localStorage.removeItem('Token');
        store.dispatch({type: 'USER_LOGGED_OUT'});
    }
    return response.data;
});

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    config.headers.Authorization = token;
    return config;
});


export default axiosInstance;