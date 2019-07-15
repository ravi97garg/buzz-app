import React, {Component} from 'react';
import PaginationListComponent from "./PaginationList";

export default (TableComponent) => {

    class PaginatedComponent extends Component {

        constructor(props) {
            super(props);
            this.state = {
                currentPage: 0,
                limit: 10,
                complaintPages: Math.ceil(this.props.complaintsCount/10)
            };
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if(prevProps.complaintsCount !== this.props.complaintsCount){
                this.setState({
                    complaintPages: Math.ceil(this.props.complaintsCount/10)
                })
            }
            if(prevState.currentPage !== this.state.currentPage || prevState.limit !== this.state.limit){
                this.props.getMyComplaintsBrief({
                    limit: this.state.limit,
                    skip: this.state.limit * (this.state.currentPage)
                })
            }
        }

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

        render() {

            return (
                <div>
                    <PaginationListComponent
                        changePageHandle={this.changePage}
                        currentPage={this.state.currentPage}
                        complaintPages={this.state.complaintPages}
                        changeLimitHandle={this.changeLimitHandle}
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

