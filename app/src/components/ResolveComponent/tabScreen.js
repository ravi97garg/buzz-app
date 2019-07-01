import React from 'react';
import ResolveRowComponent from "./ResolveRow";
import {STATUS} from "../../constants";

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
            this.props.getInitialComplaints();
            console.log('Home called from resolveTab');
        } else if (this.props.page === 'News') {
            console.log('News called from resolveTab');
            this.props.getMyDeptResolves();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.page !== this.props.page) {
            this.props.setResolveStatusDefaultAction();
        }
        if (this.props.page === 'Home') {
            console.log('Home called from resolveTab update',);
            if (this.props.resolve.resolveStatus === STATUS.DEFAULT) {
                console.log('never is he reaching here');
                this.props.getInitialComplaints();
            }
        } else if (this.props.page === 'News') {
            console.log('News called from resolveTab update');
            if (this.props.resolve.resolveStatus === STATUS.DEFAULT) {
                this.props.getMyDeptResolves();
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
                    className={'searchBar'}
                    placeholder={'Search Complaint by logger name'}
                    style={{width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '10px'}}
                />
                {this.props.resolve.complaintList[0] ? <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Logged By</td>
                        {this.props.page === 'Home' ? <td>Assigned To</td> : null}
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                    </thead>

                    {(this.props.page === 'Home') ? (
                        <tbody>
                        {this.props.resolve && this.props.resolve.complaintList
                            .filter((item) => {
                                if(this.state.searchComplaint === ''){
                                    return true
                                } else {
                                    return item.loggedBy.name.toLowerCase().startsWith(this.state.searchComplaint.toLowerCase());
                                }
                            })
                            .map(item => {
                            return (
                                <ResolveRowComponent resolves={item}
                                                     currentUser={this.props.user}
                                                     updateStatus={this.props.updateStatus}
                                                     page={this.props.page}
                                                     key={item._id}
                                                     changeStatus={this.props.changeStatus}
                                />
                            )
                        })}
                        </tbody>
                    ) : (
                        <tbody>
                        {this.props.resolve && this.props.resolve.myResolves
                            .filter((item) => {
                                if(this.state.searchComplaint === ''){
                                    return true
                                } else {
                                    return item.loggedBy.name.toLowerCase().startsWith(this.state.searchComplaint.toLowerCase());
                                }
                            })
                            .map(item => {
                                console.log(item);
                                return (
                                    <ResolveRowComponent resolves={item}
                                                         currentUser={this.props.user}
                                                         updateStatus={this.props.updateStatus}
                                                         page={this.props.page}
                                                         key={item._id}
                                    />
                                )
                            })
                        }
                        </tbody>)}

                </table> : <span>No complaints to resolve so far</span>}

            </div>
        )
    }

    componentWillUnmount() {

    }

}

export default TabScreenComponent;