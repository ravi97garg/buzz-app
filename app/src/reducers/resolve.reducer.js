const initialState = {complaintList: []};

const complaint = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_ALL_COMPLAINTS':
            return {...state, complaintList: action.payload.complaints};

        case 'UPDATE_COMPLAINT_STATUS':
            const {complaintId, status} = action.payload;
            let complaintList = [...state.complaintList];
            complaintList = complaintList.map((item) => item._id === complaintId ? {...item, status: status} : item);
            return {...state, complaintList}

        default:
            return {...state};
    }
};

export default complaint;