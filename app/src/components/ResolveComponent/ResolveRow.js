import React from 'react';
import ModalView from "../ModalComponent/ModalView";
import ComplaintDetails from "../ComplaintsComponent/ComplaintDetails";

class ResolveRowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            ],
            isModalOpen: false
        }
    };

    openDetailsModal = () => {
        this.setState({
            isModalOpen: true
        })
    };

    onClose = () => {
        this.setState({
            isModalOpen: false
        })
    };

    saveAction = (id) => {
        if (this.state[id]) {
            this.props.changeStatus(id, this.state[id]);
        }
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        const {
            resolves: {
                _id,
                status,
                loggedBy,
                assignedTo,
                department
            }
        } = this.props;
        console.log('assigned to ', assignedTo.name);
        const statusIndex = this.state.status.findIndex(element => element.statusName === status);

        return (
            <React.Fragment>
                <tr>
                    <td onClick={() => this.openDetailsModal(_id)}><span className={'text-ellipsis'}>{_id}</span></td>
                    <td>{loggedBy.name}</td>
                    {this.props.page === 'Home' && <td>{assignedTo.name}</td>}
                    {
                        ((department === this.props.currentUser.department) && (statusIndex !== 2 && statusIndex !== 3)) ?
                            <React.Fragment>
                                <td>
                                    <select name={_id} onChange={this.handleChange}>
                                        {
                                            this.state.status.slice(statusIndex).map((item) => <option
                                                    value={item.statusName}
                                                    key={item.id}
                                                >
                                                    {item.statusName}
                                                </option>
                                            )
                                        }
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => this.saveAction(_id)}>Commit</button>
                                </td>
                            </React.Fragment> :
                            <td>
                                <span>{status}</span>
                            </td>

                    }
                </tr>
                {this.state.isModalOpen ?
                    <ModalView onClose={this.onClose} component={() => <ComplaintDetails id={_id}/>}/> : null}
            </React.Fragment>
        );
    }
}

export default ResolveRowComponent;