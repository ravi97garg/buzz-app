import React, {Component} from 'react';
import {COMPLAINT_FILTER_TYPE} from "../../constants";

class PaginationList extends Component {

    changePage = (requestedPageIndex) => {
        if (requestedPageIndex > -1 && requestedPageIndex < this.props.dataPages) {
            this.props.changePageHandle(requestedPageIndex);
        }
    };

    changeLimit = (e) => {
        this.props.changeLimitHandle(e.target.value);
    };

    handleFilter = (e) => {
        this.props.changeFilter(e.target.name, e.target.value);
    };

    render() {
        const arr = [];
        for (let i = 1; i <= this.props.dataPages; i++) {
            arr.push(i.toString());
        }
        return (
            <div className={'pagination-label'}>
                <div className={'page-button-container'}>
                    <button onClick={() => this.changePage(this.props.currentPage - 1)}>
                        &lt;
                    </button>
                    {arr.map((item, index) => {
                        return (
                            <button className={this.props.currentPage === index ? 'active-page-btn' : null}
                                    onClick={() => this.changePage(index)}>
                                {index + 1}
                            </button>
                        )
                    })}
                    <button onClick={() => this.changePage(this.props.currentPage + 1)}>
                        &gt;
                    </button>
                </div>
                <div className={'page-filter-container'}>
                    Limit:
                    <select onChange={this.changeLimit}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <fieldset>
                        <legend>Complaint Status</legend>
                        <label>
                            <input
                                type="checkbox"
                                name={"complaintStatus"}
                                value={COMPLAINT_FILTER_TYPE.PENDING}
                                onClick={this.handleFilter}
                            />{COMPLAINT_FILTER_TYPE.PENDING}
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name={"complaintStatus"}
                                value={COMPLAINT_FILTER_TYPE.IN_PROGRESS}
                                onClick={this.handleFilter}
                            />{COMPLAINT_FILTER_TYPE.IN_PROGRESS}
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name={"complaintStatus"}
                                value={COMPLAINT_FILTER_TYPE.COMPLETED}
                                onClick={this.handleFilter}
                            />{COMPLAINT_FILTER_TYPE.COMPLETED}
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name={"complaintStatus"}
                                value={COMPLAINT_FILTER_TYPE.CLOSED}
                                onClick={this.handleFilter}
                            />{COMPLAINT_FILTER_TYPE.CLOSED}
                        </label>
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default PaginationList;