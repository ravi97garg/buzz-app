import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    INIT_COMPLAINT_FAILED,
    INIT_COMPLAINT_STARTED,
    INIT_COMPLAINT_SUCCESS
} from "../../constants/complaints";
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
        this.props.dataService({limit: 10});
    }

    onClose = () => {
        this.props.setStatusDefaultService();
    };

    render() {
        const {
            dataList,
            dataStatus,
        } = this.props;
        return (
            <div className={'complaint-table-container'}>
                {
                    dataStatus === INIT_COMPLAINT_STARTED ?
                        <LoaderView/> :
                        (
                            dataStatus === INIT_COMPLAINT_SUCCESS ?
                                dataList && dataList[0] ?
                                    <ComplaintTableView
                                        complaintList={dataList}
                                    /> :
                                    (<span>No complaints logged so far</span>) :
                                (dataStatus === INIT_COMPLAINT_FAILED ?
                                        <ErrorView onClose={this.onClose} component={() => <ErrorDetailsComponent/>}/> :
                                        <ComplaintTableView
                                            complaintList={dataList}
                                        />
                                )
                        )
                }
            </div>
        )
    }

}

ComplaintTable.propTypes = {
    dataList: PropTypes.array.isRequired,
    dataService: PropTypes.func.isRequired
};

ComplaintTable.defaultProps = {};

export default PaginatedComponent(ComplaintTable);