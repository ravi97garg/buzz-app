import React, {Component} from 'react';

class PaginationList extends Component {

    changePage = (requestedPageIndex) => {
        if(requestedPageIndex > -1 && requestedPageIndex < this.props.complaintPages){
            this.props.changePageHandle(requestedPageIndex);
        }
    };

    changeLimit = (e) => {
        this.props.changeLimitHandle(e.target.value);
    };

    render() {
        const arr = [];
        for (let i = 1; i <= this.props.complaintPages; i++) {
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
                            <button className={this.props.currentPage === index ? 'active-page-btn' : null} onClick={() => this.changePage(index)}>
                                {index + 1}
                            </button>
                        )
                    })}
                    <button onClick={() => this.changePage(this.props.currentPage + 1)}>
                        &gt;
                    </button>
                </div>
                <div className={'page-filter-container'}>
                    <select onChange={this.changeLimit}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default PaginationList;