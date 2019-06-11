import buzzReducer from './buzz.reducer';
import userReducer from './user.reducer';
import {combineReducers} from "redux";
import complaintReducer from "./complaint.reducer";

const mainReducer = combineReducers({
    buzz: buzzReducer,
    user: userReducer,
    complaint: complaintReducer
});

export default mainReducer;