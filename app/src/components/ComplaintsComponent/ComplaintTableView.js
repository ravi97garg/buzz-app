import React, {Component} from 'react';
import ComplaintRow from "./ComplaintRow";

class ComplaintTableView extends Component {

    render() {
        const {
            complaintList
        } = this.props;
        return (
            <div>
                <table className={'complaint-table'}>
                    <thead>
                    {
                        complaintList && complaintList[0] && <tr>
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
                        complaintList && complaintList[0] && complaintList.map((item) => {
                                return (
                                    <ComplaintRow uid={item.uid}
                                                  key={item.uid}
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