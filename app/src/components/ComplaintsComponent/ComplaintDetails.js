import React from 'react';
import {getMyComplaintsDetailed} from "../../services/complaint.service";
import ImageSlider from "../ImageSliderComponent";

export default class ComplaintDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            complaintContent: '',
            createdAt: '',
            loggedBy: '',
            assignedTo: '',
            images: [],
            viewMore: false
        }
    }

    componentDidMount() {
        getMyComplaintsDetailed(this.props.id).then((res) => {
            this.setState({
                subject: res.complaints.subject,
                complaintContent: res.complaints.complaintContent,
                createdAt: res.complaints.createdAt,
                loggedBy: res.complaints.loggedBy,
                assignedTo: res.complaints.assignedTo,
                images: res.complaints.images
            })
        })
    }

    toggleViewMore = () => {
        this.setState({
            viewMore: !this.state.viewMore
        })
    };


    render() {
        const {
            subject,
            complaintContent,
            createdAt,
            loggedBy,
            assignedTo,
            images
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
                <p className={this.state.viewMore ? null : 'show-ellipsis'}>
                    {complaintContent}
                </p>
                <button className={'view-more-btn'} onClick={this.toggleViewMore}>{this.state.viewMore === false ? 'View More' : 'Hide'}</button>
                {images && images[0] && <ImageSlider images={images}/>}
                <span>Logged on {new Date(createdAt).toLocaleString()}</span>
            </div>
        )
    }
}