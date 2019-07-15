import React from 'react';
import ComplaintsForm from './ComplaintForm';
import ComplaintsTable from './ComplaintTable';
import {connect} from "react-redux";
import {
    createComplaint, getComplaintCount,
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
                    complaintList={this.props.complaints.complaintList}
                    getMyComplaintsBrief={this.props.getMyComplaintsBrief}
                    getComplaintCount={this.props.getComplaintCount}
                    setComplaintStatusDefaultService={this.props.setComplaintStatusDefaultService}
                    complaintsCount={this.props.complaints.complaintsCount}
                    complaintStatus={this.props.complaints.complaintStatus}
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
    getComplaintCount
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsComponent);