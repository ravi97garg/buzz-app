const fetchUser = (user) => ({
    type: 'USER_LOGGED_IN',
    payload: user
});

export const logOutUser = () => ({
    type: 'USER_LOGGED_OUT'
});


export const createUser = (user) => (dispatch) => {
    console.log('hello user', JSON.stringify(user))
    dispatch(fetchUser(user));

};