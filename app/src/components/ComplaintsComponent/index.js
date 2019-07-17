import React from 'react';
import ComplaintsForm from './ComplaintForm';
import ComplaintsTable from './ComplaintTable';
import {connect} from "react-redux";
import {
    createComplaint,
    getMyComplaintsBrief,
    setComplaintStatusDefaultService
} from "../../services/complaint.service";

class ComplaintsComponent extends React.Component {
    render() {
        return (
            <div className={'buzz'}>
                <ComplaintsForm
                    complaints={this.props.complaints}
                    createComplaint={this.props.createComplaint}
                    setComplaintStatusDefaultService={this.props.setComplaintStatusDefaultService}
                />
                <ComplaintsTable
                    dataList={this.props.complaints.complaintList}
                    dataService={this.props.getMyComplaintsBrief}
                    setStatusDefaultService={this.props.setComplaintStatusDefaultService}
                    dataCount={this.props.complaints.complaintsCount}
                    dataStatus={this.props.complaints.complaintStatus}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        complaints: state.complaint
    }
};

const mapDispatchToProps = {
    getMyComplaintsBrief,
    createComplaint,
    setComplaintStatusDefaultService,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsComponent);