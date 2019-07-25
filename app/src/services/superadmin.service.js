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

export const changeUserStatus = (userId, status) => (dispatchEvent) => {
    dispatchEvent(changeUserStatusStarted());
    axiosInstance.get(`/data/superadmin/changeUserStatus/${userId}?status=${status}`)
        .then(() => {
            dispatchEvent(changeUserStatusSuccess(userId, status));
        })
        .catch((err) => {
            dispatchEvent(changeUserStatusFailed());
        })
};