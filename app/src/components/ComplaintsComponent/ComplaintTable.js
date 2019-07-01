import React from "react";
import {
    INIT_COMPLAINT_FAILED,
    INIT_COMPLAINT_STARTED,
    INIT_COMPLAINT_SUCCESS
} from "../../constants/complaints";
import ErrorDetailsComponent from "../ErrorDetailsComponent";
import ErrorView from "../ModalComponent/ErrorView";
import ComplaintTableView from "./ComplaintTableView";
import LoaderView from "../Loader/view";

class ComplaintTable extends React.Component {

    render() {
        const {
            complaints
        } = this.props;
        return (
            <div className={'complaint-table-container'}>
                {complaints.complaintStatus === INIT_COMPLAINT_STARTED ?
                    <LoaderView/> : (complaints.complaintStatus === INIT_COMPLAINT_SUCCESS ?
                        (complaints && complaints.complaintList[0] ?
                            <ComplaintTableView
                                complaints={complaints}
                            /> :
                            (<span>No complaints logged so far</span>)) :
                        (complaints.complaintStatus === INIT_COMPLAINT_FAILED ?
                                <ErrorView onClose={this.onClose} component={() => <ErrorDetailsComponent/>}/> :
                                <ComplaintTableView
                                    complaints={complaints}
                                />
                        ))}
            </div>
        )
    }

    componentDidMount() {
        this.props.getMyComplaintsBrief();
    }

}

export default ComplaintTable;