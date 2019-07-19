import {combineReducers} from "redux";

import buzzReducer from './buzz.reducer';
import userReducer from './user.reducer';
import complaintReducer from "./complaint.reducer";
import resolveReducer from "./resolve.reducer";
import superAdminReducer from "./superadmin.reducer";

const mainReducer = combineReducers({
    buzz: buzzReducer,
    user: userReducer,
    complaint: complaintReducer,
    resolve: resolveReducer,
    superadmin: superAdminReducer
});

export default mainReducer;