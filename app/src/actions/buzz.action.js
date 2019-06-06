import {getToken} from "../utilities";
import {authenticateToken} from "../services/authenticate";

const createBuzz = (buzz) => ({
    type: 'CREATE_BUZZ',
    payload: buzz
});


export const createUser = (token = getToken()) => (dispatch) =>{

    authenticateToken(token).then((res) => {
        console.log(res.data);
        dispatch(createBuzz(res.data));
    }).catch((error) => {
        console.log(error)
    })
};