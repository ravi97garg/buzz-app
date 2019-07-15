import React, {Component} from 'react';
import ComplaintRow from "./ComplaintRow";

class ComplaintTableView extends Component {

    render() {
        return (
            <div>
                <table className={'complaint-table'}>
                    <thead>
                    {
                        this.props.complaintList && this.props.complaintList[0] && <tr>
                            <td>Complaint Id</td>
                            <td>Issue Title</td>
                            <td>Department</td>
                            <td>Assigned To</td>
                            <td>Status</td>
                        </tr>
                    }
                    </thead>
                    <tbody>
                    {
                        this.props.complaintList && this.props.complaintList[0] && this.props.complaintList.map((item) => {
                                return (
                                    <ComplaintRow id={item._id}
                                                  key={item._id}
                                                  subject={item.subject}
                                                  department={item.department}
                                                  status={item.status}
                                                  assignedTo={item.assignedTo}
                                    />
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default ComplaintTableView;