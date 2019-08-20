import axiosInstance from "../config/axios";
import {
    changeUserStatusFailed,
    changeUserStatusStarted, changeUserStatusSuccess,
    fetchAllUsersFailed,
    fetchAllUsersStarted,
    fetchAllUsersSuccess
} from "../actions/superadmin.action";

export const getUsers = () => (dispatchEvent) => {
    dispatchEvent(fetchAllUsersStarted());
    axiosInstance.get('/data/superadmin/getUsers')
        .then((res) => {
            dispatchEvent(fetchAllUsersSuccess(res.users));
        })
        .catch((err) => {
            dispatchEvent(fetchAllUsersFailed());
        })
};

export const changeUserStatus = (userId, status, role) => (dispatchEvent) => {
    dispatchEvent(changeUserStatusStarted());
    console.log('user is ', JSON.stringify(userId));
    axiosInstance.get(`/data/superadmin/changeUserStatus/${userId.toString()}?status=${status}&&role=${role}`)
        .then(() => {
            dispatchEvent(changeUserStatusSuccess(userId, status, role));
        })
        .catch((err) => {
            dispatchEvent(changeUserStatusFailed());
        })
};