import React from 'react';
import {getMyComplaintsDetailed} from "../../services/complaint.service";

export default class ComplaintDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            complaintContent: '',
            createdAt: '',
            loggedBy: '',
            assignedTo: ''
        }
    }

    componentDidMount() {
        getMyComplaintsDetailed(this.props.id).then((res) => {
            this.setState({
                subject: res.complaints.subject,
                complaintContent: res.complaints.complaintContent,
                createdAt: res.complaints.createdAt,
                loggedBy: res.complaints.loggedBy,
                assignedTo: res.complaints.assignedTo
            })
        })
    }

    render() {
        const {
            subject,
            complaintContent,
            createdAt,
            loggedBy,
            assignedTo
        } = this.state;
        return (
            <div className='modalcontainer'>
                <div className={'user-icons-container'}>
                    <div className={'complaint-user-img-wrapper left'}>
                        <img alt={createdAt} src={loggedBy.profileImage}/>
                        <span>Assigned by</span>
                        <span className={'bold-text'}>{loggedBy.name}</span>
                    </div>
                    <div className={'complaint-user-img-wrapper right'}>
                        <img alt={createdAt} src={assignedTo.profileImage}/>
                        <span>Assigned to</span>
                        <span className={'bold-text'}>{assignedTo.name}</span>
                    </div>
                </div>
                <h2 className='complaintheading'>{subject}</h2>
                <p>{complaintContent}</p>
                <span>Logged on {new Date(createdAt).toLocaleString()}</span>
            </div>
        )
    }
}