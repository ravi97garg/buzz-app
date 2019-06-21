const fetchUser = (user) => ({
    type: 'USER_LOGGED_IN',
    payload: user
});

export const logOutUser = () => ({
    type: 'USER_LOGGED_OUT'
});

export const changeProfileImage = (imageUrl) => ({
    type: 'CHANGE_PROFILE_IMAGE',
    imageUrl
});


export const createUser = (user) => (dispatch) => {
    dispatch(fetchUser(user));

};

export const changeProfileImageAction = (imageUrl) => (dispatch) => {
    dispatch(changeProfileImage(imageUrl));
};