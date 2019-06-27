import {
    GET_MY_RESOLVE_FAILED,
    GET_MY_RESOLVE_STARTED,
    GET_MY_RESOLVE_SUCCESS,
    INIT_ALL_COMPLAINTS_FAILED,
    INIT_ALL_COMPLAINTS_STARTED,
    INIT_ALL_COMPLAINTS_SUCCESS, SET_RESOLVE_STATUS_DEFAULT,
    UPDATE_COMPLAINT_STATUS_FAILED,
    UPDATE_COMPLAINT_STATUS_STARTED,
    UPDATE_COMPLAINT_STATUS_SUCCESS
} from "../constants/resolve";

export const getInitComplaintsSuccess = (complaints) => ({
    type: INIT_ALL_COMPLAINTS_SUCCESS,
    payload: {complaints}
});

export const getInitComplaintsStarted = () => ({
    type: INIT_ALL_COMPLAINTS_STARTED
});

export const getInitComplaintsFailed = () => ({
    type: INIT_ALL_COMPLAINTS_FAILED
});

export const getMyResolvesStarted = () => ({
    type: GET_MY_RESOLVE_STARTED
});

export const getMyResolvesSuccess = (data) => ({
    type: GET_MY_RESOLVE_SUCCESS,
    data
});

export const getMyResolvesFailed = () => ({
    type: GET_MY_RESOLVE_FAILED
});

// export const updateStatusAction = (complaintId, status) => (dispatch) => {
//     dispatch(updateComplaintStatus(complaintId, status));
// };

export const updateComplaintStatusStarted = () => ({
    type: UPDATE_COMPLAINT_STATUS_STARTED
});

export const updateComplaintStatusFailed = () => ({
    type: UPDATE_COMPLAINT_STATUS_FAILED
});

export const updateComplaintStatusSuccess = (complaintId, status) => ({
    type: UPDATE_COMPLAINT_STATUS_SUCCESS,
    payload: {complaintId, status}
});

export const setResolveStatusDefault = () => ({
    type: SET_RESOLVE_STATUS_DEFAULT
});