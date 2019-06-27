
const initComplaint = (complaints) => ({
    type: 'INIT_COMPLAINT',
    payload: {complaints}
});

const addComplaint = (complaint) => ({
    type: 'ADD_COMPLAINT',
    payload: {complaint}
});


export const initComplaintAction = (complaints) => (dispatch) =>{
    dispatch(initComplaint(complaints));
};

export const addComplaintAction = (complaint) => (dispatch) =>{
    dispatch(addComplaint(complaint));
};

