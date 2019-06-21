import React from "react";
import {connect} from "react-redux";
import {initComplaintAction} from "../../actions/complaint.action";
import {getMyComplaintsBrief} from "../../services/complaint.service";
import ComplaintRow from "./complaintRow";

class ComplaintTable extends React.Component {

    render() {
        return (
            <div className={'complaint-table-container'}>
                {this.props.complaints.complaintList[0] ? <table className={'complaint-table'}>
                    <thead>
                    <tr>
                        <td>Complaint Id</td>
                        <td>Issue Title</td>
                        <td>Department</td>
                        <td>Assigned To</td>
                        <td>Status</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.complaints && this.props.complaints.complaintList.map((item) => {
                        return (
                            <ComplaintRow id={item._id}
                                          key={item._id}
                                          subject={item.subject}
                                          department={item.department}
                                          status={item.status}
                                          assignedTo={item.assignedTo}
                            />
                        )
                    })}
                    </tbody>
                </table> : <span>No complaints logged so far</span>}
            </div>
        )
    }

    componentDidMount() {
        getMyComplaintsBrief().then((res) => {
            this.props.initComplaintAction(res.complaints);
        }).catch((err) => {
            console.error(err);
        });
    }

}

const mapStateToProps = (state) => {
    return {
        complaints: state.complaint
    }
};

const mapDispatchToProps = {
    initComplaintAction
};

const ComplaintTableConnect = connect(mapStateToProps, mapDispatchToProps)(ComplaintTable);

export default ComplaintTableConnect;