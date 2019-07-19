import axiosInstance from "../config/axios";
import {
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