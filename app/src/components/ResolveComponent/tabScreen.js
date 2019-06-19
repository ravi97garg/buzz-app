import React from 'react';
import {getInitialComplaints} from "../../services/resolve.service";
import ResolveRowComponent from "./resolveRow";

class TabScreenComponent extends React.Component {

    componentDidMount() {
        if (this.props.page === 'Home') {
            getInitialComplaints().then((res) => {
                this.props.getInitComplaintsAction(res.complaints);
            });
            console.log('Home called from resolveTab');
        } else if (this.props.page === 'News') {
            console.log('News called from resolveTab');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.page === 'Home') {
            console.log('Home called from resolveTab update');
        } else if (this.props.page === 'News') {
            console.log('News called from resolveTab update');
        }
    }

    render() {
        return (
            <div className={'tabcontent'}>
                hello {this.props.page}
                <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Logged By</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                    </thead>

                    {(this.props.page === 'Home') ? (<tbody>
                        {this.props.resolve && this.props.resolve.complaintList.map(item => {
                            return (
                                <ResolveRowComponent resolves={item}
                                                     currentUser={this.props.user}
                                                     updateStatus={this.props.updateStatus}
                                />
                            )
                        })}
                        </tbody>
                    ) : (
                        <tbody>
                        {this.props.resolve && this.props.resolve.complaintList.filter(item => {
                            return item.department === this.props.user.department
                        })
                            .map(item => {
                                return (
                                    <ResolveRowComponent resolves={item}
                                                         currentUser={this.props.user}
                                                         updateStatus={this.props.updateStatus}
                                    />
                                )
                            })
                        }
                        </tbody>)}

                </table>
            </div>
        )
    }

}

export default TabScreenComponent;