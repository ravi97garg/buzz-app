import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {INIT_COMPLAINT_FAILED, INIT_COMPLAINT_STARTED, INIT_COMPLAINT_SUCCESS} from "../../constants/complaints";
import LoaderView from "../Loader/view";
import ComplaintTableView from "./ComplaintTableView";
import ErrorView from "../ModalComponent/ErrorView";
import ErrorDetailsComponent from "../ErrorDetailsComponent";
import PaginatedComponent from "../PaginationHOC"

class ComplaintTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }


    componentDidMount() {
        console.log('complaintTable didMount', this.props.complaintList);
        this.props.getMyComplaintsBrief({limit: 10});
    }

    onClose = () => {
        this.props.setComplaintStatusDefaultService();
    };

    render() {
        const {
            complaintList,
            complaintsCount,
            complaintStatus,
            getMyComplaintsBrief
        } = this.props;
        return (
            <div className={'complaint-table-container'}>
                {
                    complaintStatus === INIT_COMPLAINT_STARTED ?
                        <LoaderView/> :
                        (
                            complaintStatus === INIT_COMPLAINT_SUCCESS ?
                                complaintList && complaintList[0] ?
                                    <ComplaintTableView
                                        complaintList={complaintList}
                                        getDataService={getMyComplaintsBrief}
                                        count={complaintsCount}
                                    /> :
                                    (<span>No complaints logged so far</span>) :
                                (complaintStatus === INIT_COMPLAINT_FAILED ?
                                        <ErrorView onClose={this.onClose} component={() => <ErrorDetailsComponent/>}/> :
                                        <ComplaintTableView
                                            complaintList={complaintList}
                                            getDataService={getMyComplaintsBrief}
                                            count={complaintsCount}
                                        />
                                )
                        )
                }
            </div>
        )
    }

}

ComplaintTable.propTypes = {
    complaintList: PropTypes.array.isRequired,
    getMyComplaintsBrief: PropTypes.func.isRequired
};

ComplaintTable.defaultProps = {}

export default PaginatedComponent(ComplaintTable);