import {POST_COMMENT_SUCCESS} from "../constants/buzz";

const createComment = (comment) => ({
    type: POST_COMMENT_SUCCESS,
    payload: comment
});

export const createCommentAction = (comment) => (dispatch) =>{
    dispatch(createComment(comment));
};

