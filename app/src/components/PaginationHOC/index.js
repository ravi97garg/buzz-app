import React, {Component} from 'react';
import PaginationListComponent from "./PaginationList";

export default (TableComponent) => {

    class PaginatedComponent extends Component {

        constructor(props) {
            super(props);
            this.state = {
                currentPage: 0,
                limit: 10,
                complaintStatus: [],
                dataPages: Math.ceil(this.props.dataCount / 10)
            };
        }

        componentDidUpdate = (prevProps, prevState, snapshot) => {
            if (prevProps.dataCount !== this.props.dataCount || prevState.limit !== this.state.limit) {
                this.setState({
                    dataPages: Math.ceil(this.props.dataCount / this.state.limit)
                })
            }
            if (prevState.currentPage !== this.state.currentPage ||
                prevState.limit !== this.state.limit ||
                (prevState.complaintStatus && prevState.complaintStatus.length !== this.state.complaintStatus.length)
            ) {
                this.props.dataService({
                    limit: this.state.limit,
                    skip: this.state.limit * (this.state.currentPage),
                    complaintStatus: this.state.complaintStatus
                })
            }
        };

        changePage = (requestedPageIndex) => {
            this.setState({
                currentPage: requestedPageIndex
            });
        };

        changeLimitHandle = (limit) => {
            this.setState({
                limit
            })
        };

        changeFilter = (filterKey, filterValue) => {
            console.log(filterKey, filterValue);
            if (Object.keys(this.state).includes(filterKey)) {
                if (this.state[filterKey].includes(filterValue)) {
                    this.setState({
                        [filterKey]: this.state[filterKey].filter((item) => item !== filterValue)
                    })
                } else {
                    this.setState({
                        [filterKey]: [...this.state[filterKey], filterValue]
                    })
                }

            } else {
                this.setState({
                    [filterKey]: [filterValue]
                })
            }
        };

        render = () => {
            return (
                <div>
                    <PaginationListComponent
                        changePageHandle={this.changePage}
                        currentPage={this.state.currentPage}
                        dataPages={this.state.dataPages}
                        changeLimitHandle={this.changeLimitHandle}
                        changeFilter={this.changeFilter}
                    />
                    <TableComponent
                        {
                            ...this.props
                        }

                    />
                </div>

            )
        }
    }

    return PaginatedComponent;
};

