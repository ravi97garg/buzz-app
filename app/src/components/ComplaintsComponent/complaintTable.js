import React from "react";
import {connect} from "react-redux";
import {initComplaintAction} from "../../actions/complaint.action";
import {getMyComplaints} from "../../services/complaint.service";

class ComplaintTable extends React.Component {

    render() {
        return (
            <div>
                {this.props.complaints.complaintList[0] ? <table>
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
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.subject}</td>
                                <td>{item.department}</td>
                                <td>{item.assignedTo}</td>
                                <td>{item.status}</td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table> : <span>No complaints logged so far</span>}
            </div>
        )
    }

    componentDidMount() {
        getMyComplaints().then((res) => {
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