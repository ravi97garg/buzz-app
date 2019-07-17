import {COMPLAINT_FILTER_TYPE, STATUS} from "../constants";
import {
    ADD_COMPLAINT_FAILED,
    ADD_COMPLAINT_STARTED,
    ADD_COMPLAINT_SUCCESS,
    CHANGE_FILTER_SUCCESS,
    INIT_COMPLAINT_FAILED,
    INIT_COMPLAINT_STARTED,
    INIT_COMPLAINT_SUCCESS,
    SET_COMPLAINT_STATUS_DEFAULT
} from "../constants/complaints";

const initialState = {
    complaintList: [],
    complaintStatus: STATUS.DEFAULT,
    complaintsCount: 0,
    complaintFilter: COMPLAINT_FILTER_TYPE.ALL_COMPLAINTS
};

const complaint = (state = initialState, action) => {
    switch (action.type) {
        case INIT_COMPLAINT_STARTED: {
            return {...state, complaintStatus: INIT_COMPLAINT_STARTED}
        }

        case INIT_COMPLAINT_SUCCESS:
            return {
                ...state,
                complaintList: action.payload.complaints,
                complaintsCount: action.payload.complaintsCount,
                complaintStatus: INIT_COMPLAINT_SUCCESS
            };

        case INIT_COMPLAINT_FAILED:
            return {
                ...state,
                complaintStatus: INIT_COMPLAINT_FAILED
            };

        case ADD_COMPLAINT_STARTED:
            return {
                ...state,
                complaintStatus: ADD_COMPLAINT_STARTED
            };

        case ADD_COMPLAINT_SUCCESS:
            return {
                ...state,
                complaintList: [action.payload.complaint, ...state.complaintList],
                complaintStatus: ADD_COMPLAINT_SUCCESS,
                complaintsCount: state.complaintsCount+1
            };

        case ADD_COMPLAINT_FAILED:
            return {
                ...state,
                complaintStatus: ADD_COMPLAINT_FAILED
            };

        case CHANGE_FILTER_SUCCESS:
            return {
                ...state,
                complaintFilter: action.payload.complaintFilter
            };

        case SET_COMPLAINT_STATUS_DEFAULT:
            return {
                ...state,
                complaintStatus: STATUS.DEFAULT
            };

        default:
            return state;
    }
};

export default complaint;