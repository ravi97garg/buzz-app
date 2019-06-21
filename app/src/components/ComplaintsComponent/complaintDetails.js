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
            console.log(`hey there ${JSON.stringify(res)}`);
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
            <div>
                <div className={'comment-img-wrapper'}>
                    <img alt={createdAt} src={loggedBy.profileImage}/>
                </div>
                <div className={'comment-img-wrapper'}>
                    <img alt={createdAt} src={assignedTo.profileImage}/>
                </div>
                <h2>{subject}</h2>
                <p>{complaintContent}</p>
                <span>{createdAt}</span>
            </div>
        )
    }
}