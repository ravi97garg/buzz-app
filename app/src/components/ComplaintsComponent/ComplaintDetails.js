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
        getMyComplaintsDetailed(this.props.uid).then((res) => {
            const {
                subject,
                complaintContent,
                createdAt,
                loggedBy,
                assignedTo,
                images
            } = res.complaints;
            this.setState({
                subject: subject,
                complaintContent: complaintContent,
                createdAt: createdAt,
                loggedBy: loggedBy,
                assignedTo: assignedTo,
                images: images
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
            loggedBy: {
                name: loggedByName,
                profileImage: loggedByImage
            },
            assignedTo: {
                name: assignedToName,
                profileImage: assignedToImage
            },
            images,
            viewMore
        } = this.state;
        return (
            <div className='modalcontainer'>
                <div className={'user-icons-container'}>
                    <div className={'complaint-user-img-wrapper left'}>
                        <img alt={createdAt} src={loggedByImage}/>
                        <span>Assigned by</span>
                        <span className={'bold-text'}>{loggedByName}</span>
                    </div>
                    <div className={'complaint-user-img-wrapper right'}>
                        <img alt={createdAt} src={assignedToImage}/>
                        <span>Assigned to</span>
                        <span className={'bold-text'}>{assignedToName}</span>
                    </div>
                </div>
                <h2 className='complaintheading'>{subject}</h2>
                <p className={viewMore ? null : 'show-ellipsis'}>
                    {complaintContent}
                </p>
                <button className={'view-more-btn'} onClick={this.toggleViewMore}>{viewMore === false ? 'View More' : 'Hide'}</button>
                {images && images[0] && <ImageSlider images={images}/>}
                <span>Logged on {new Date(createdAt).toLocaleString()}</span>
            </div>
        )
    }
}