import axiosInstance from "../config/axios";

export const postCommentService = (buzzId, comment) => {
    return axiosInstance.post('/data/buzz/postComment', {
        buzzId,
        comment
    })
};

