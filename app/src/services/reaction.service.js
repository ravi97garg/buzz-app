import axiosInstance from "../config/axios";

export const reactionService = (buzzId, reactionType) => {
    return axiosInstance.post('/data/buzz/postReaction', {
        buzzId,
        reactionType
    })
};