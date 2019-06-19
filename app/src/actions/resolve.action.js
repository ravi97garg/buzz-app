const getInitComplaints = (complaints) => ({
    type: 'INIT_ALL_COMPLAINTS',
    payload: {complaints}
});

const updateComplaintStatus = (complaintId, status) => ({
    type: 'UPDATE_COMPLAINT_STATUS',
    payload: {complaintId, status}
});



export const getInitComplaintsAction = (complaints) => (dispatch) =>{
    dispatch(getInitComplaints(complaints));
};

export const updateStatusAction = (complaintId, status) => (dispatch) =>{
    dispatch(updateComplaintStatus(complaintId, status));
};
