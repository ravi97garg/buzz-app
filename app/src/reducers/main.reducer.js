import buzzReducer from './buzz.reducer';
import userReducer from './user.reducer';
import {combineReducers} from "redux";

const mainReducer = combineReducers({
    buzz: buzzReducer,
    user: userReducer
});

export default mainReducer;