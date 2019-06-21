const createComment = (comment) => ({
    type: 'POST_COMMENT',
    payload: comment
});

export const createCommentAction = (comment) => (dispatch) =>{
    dispatch(createComment(comment));
};
