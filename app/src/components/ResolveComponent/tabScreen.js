import React from 'react';
import PropTypes from 'prop-types';

import ResolveRowComponent from "./ResolveRow";
import {STATUS} from "../../constants";
import PaginatedComponent from "../PaginationHOC";

class TabScreenComponent extends React.Component {

    state = {
        searchComplaint: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    componentDidMount() {
        if (this.props.page === 'Home') {
            this.props.dataService();
        } else if (this.props.page === 'News') {
            this.props.dataService(this.props.user.department);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.page !== this.props.page) {
            this.props.setStatusDefaultService();
        }
        if (this.props.page === 'Home') {
            console.log('hi there')
            if (this.props.dataStatus === STATUS.DEFAULT) {
                this.props.dataService();
            }
        } else if (this.props.page === 'News') {
            console.log('hi here', this.props.dataStatus)
            if (this.props.dataStatus === STATUS.DEFAULT) {
                console.log('hi here')
                this.props.dataService(this.props.user.department);
            }
        }
    }

    render() {
        return (
            <div className={'tabcontent'}>
                <input
                    name={'searchComplaint'}
                    onChange={this.handleChange}
                    value={this.state.searchComplaint}
                    className={'search-bar'}
                    placeholder={'Search Complaint by logger name'}
                />
                {this.props.dataList && this.props.dataList[0] ? <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Logged By</td>
                        {this.props.page === 'Home' ? <td>Assigned To</td> : null}
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.dataList
                        .filter((item) => {
                            if(this.state.searchComplaint === ''){
                                return true
                            } else {
                                return item.loggedBy.name.toLowerCase().includes(this.state.searchComplaint.toLowerCase());
                            }
                        })
                        .map(item => {
                            return (
                                <ResolveRowComponent resolves={item}
                                                     currentUser={this.props.user}
                                                     page={this.props.page}
                                                     key={item.uid}
                                                     changeStatus={this.props.changeStatus}
                                                     assignResolveService={this.props.assignResolveService}
                                />
                            )
                        })}
                    </tbody>

                </table> : <span>No complaints to resolve so far</span>}

            </div>
        )
    }

}

TabScreenComponent.propTypes = {
    dataList: PropTypes.array.isRequired,
    dataService: PropTypes.func.isRequired
};

TabScreenComponent.defaultProps = {};

export default PaginatedComponent(TabScreenComponent);