import React, {Component} from 'react';

class ChangeStatusView extends Component {

    state = {
        status: [
            {
                id: '0',
                statusName: 'Pending'
            },
            {
                id: '1',
                statusName: 'In Progress'
            },
            {
                id: '2',
                statusName: 'Completed'
            },
            {
                id: '3',
                statusName: 'Closed'
            }
        ]
    };

    render() {
        return (
            <React.Fragment>
                <td>
                    {this.props.currentUser._id !== this.props.resolveAssignedTo._id ?
                        <span>{this.state.status[this.props.statusIndex].statusName}</span> :
                        <select name={this.props.id} onChange={this.props.handleChange}>
                            {
                                this.state.status.slice(this.props.statusIndex).map((item) => <option
                                        value={item.statusName}
                                        key={item.id}
                                    >
                                        {item.statusName}
                                    </option>
                                )
                            }
                        </select>
                    }
                </td>
                <td>
                    {this.props.currentUser._id !== this.props.resolveAssignedTo._id ?
                        <button onClick={() => this.props.assignResolve(this.props.id)}>Assign to me</button>
                        :
                        <button onClick={() => this.props.saveAction(this.props.id)}>Commit</button>
                    }
                </td>


            </React.Fragment>
        )
    }

}

export default ChangeStatusView;