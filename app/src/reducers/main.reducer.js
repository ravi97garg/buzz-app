import buzzReducer from './buzz.reducer';
import userReducer from './user.reducer';
import {combineReducers} from "redux";
import complaintReducer from "./complaint.reducer";
import resolveReducer from "./resolve.reducer";

const mainReducer = combineReducers({
    buzz: buzzReducer,
    user: userReducer,
    complaint: complaintReducer,
    resolve: resolveReducer
});

export default mainReducer;