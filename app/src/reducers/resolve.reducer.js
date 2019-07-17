import {
    ASSIGN_RESOLVE_STARTED,
    ASSIGN_RESOLVE_FAILED,
    ASSIGN_RESOLVE_SUCCESS,
    INIT_ALL_COMPLAINTS_FAILED,
    INIT_ALL_COMPLAINTS_STARTED,
    INIT_ALL_COMPLAINTS_SUCCESS, SET_RESOLVE_STATUS_DEFAULT,
    UPDATE_COMPLAINT_STATUS_FAILED,
    UPDATE_COMPLAINT_STATUS_STARTED,
    UPDATE_COMPLAINT_STATUS_SUCCESS
} from "../constants/resolve";
import {STATUS} from "../constants";

const initialState = {
    complaintList: [],
    resolveStatus: STATUS.DEFAULT,
    assignResolveStatus: STATUS.DEFAULT
 };

const resolve = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_COMPLAINT_STATUS_STARTED:
            return {...state, resolveStatus: UPDATE_COMPLAINT_STATUS_STARTED};

        case UPDATE_COMPLAINT_STATUS_FAILED:
            return {...state, resolveStatus: UPDATE_COMPLAINT_STATUS_FAILED};

        case UPDATE_COMPLAINT_STATUS_SUCCESS:
            const {complaintId, status} = action.payload;
            let complaintList = [...state.complaintList];
            complaintList = complaintList.map((item) => item._id === complaintId ? {...item, status: status} : item);
            return {...state, complaintList};

        // case GET_MY_RESOLVE_STARTED:
        //     return {...state, resolveStatus: GET_MY_RESOLVE_STARTED};
        //
        // case GET_MY_RESOLVE_SUCCESS:
        //     return {...state, myResolves: [...action.data], resolveStatus: GET_MY_RESOLVE_SUCCESS};
        //
        // case GET_MY_RESOLVE_FAILED:
        //     return {...state, resolveStatus: GET_MY_RESOLVE_FAILED};

        case INIT_ALL_COMPLAINTS_STARTED:
            return {...state, resolveStatus: INIT_ALL_COMPLAINTS_STARTED};

        case INIT_ALL_COMPLAINTS_SUCCESS:
            return {...state,
                complaintList: action.payload.complaints,
                complaintsCount: action.payload.complaintsCount,
                resolveStatus: INIT_ALL_COMPLAINTS_SUCCESS
            };

        case INIT_ALL_COMPLAINTS_FAILED:
            return {...state, resolveStatus: INIT_ALL_COMPLAINTS_FAILED};

        case SET_RESOLVE_STATUS_DEFAULT:
            return {...state, resolveStatus: STATUS.DEFAULT};

        case ASSIGN_RESOLVE_STARTED:
            return {...state, assignResolveStatus: STATUS.STARTED};

        case ASSIGN_RESOLVE_SUCCESS: {
            const {
                resolveId,
                user
            } = action.payload;
            const updatedComplaintIndex = state.complaintList.findIndex((item) => item._id === resolveId);
            // const updatedResolveIndex = state.myResolves.findIndex((item) => item._id === resolveId);
            const complaints = [...state.complaintList];
            // const resolves= [...state.myResolves];
            complaints[updatedComplaintIndex].assignedTo = user;
            // if(resolves[0]){
            //     resolves[updatedResolveIndex].assignedTo = user;
            // }
            return {...state,
                assignResolveStatus: STATUS.SUCCESS,
                complaintList: complaints,
            };
        }

        case ASSIGN_RESOLVE_FAILED:
            return {...state, assignResolveStatus: STATUS.FAILED};

        default:
            return state;
    }
};

export default resolve;