import {getToken} from "../utilities";
import {authenticateToken} from "../services/authenticate";

const fetchUser = (user) => ({
    type: 'USER_LOGGED_IN',
    payload: user
});

export const logOutUser = () => ({
    type: 'USER_LOGGED_OUT'
});



export const createUser = (token = getToken()) => (dispatch) =>{

    authenticateToken(token).then((res) => {
        console.log(res.data);
        dispatch(fetchUser(res.data));
    }).catch((error) => {
        console.log(error)
    })
};