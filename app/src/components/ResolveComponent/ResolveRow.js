import React from 'react';
import ModalView from "../ModalComponent/ModalView";
import ComplaintDetails from "../ComplaintsComponent/ComplaintDetails";
import ChangeStatusView from "./ChangeStatusView";

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
            isModalOpen: false,
            toastClasses: 'snackbar ',
            [this.props.resolves.uid]: this.props.resolves.status
        }
    };

    setToast = () => {
        this.setState({
            toastClasses: this.state.toastClasses + 'show-toast'
        });

        setTimeout(() => {
            this.setState({
                toastClasses: 'snackbar '
            });
        }, 3000)
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

    saveAction = (uid) => {
        if (this.state[uid] !== this.props.resolves.status) {
            this.props.changeStatus(uid, this.state[uid]);
            this.setToast();
        }
    };

    assignResolve = (uid) => {
        this.props.assignResolveService(uid, this.props.currentUser);
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        const {
            resolves: {
                uid,
                status,
                loggedBy,
                assignedTo,
                department
            },
            currentUser
        } = this.props;
        const statusIndex = this.state.status.findIndex(element => element.statusName === status);

        return (
            <React.Fragment>
                <tr>
                    <td onClick={this.openDetailsModal}><span className={'text-ellipsis'}>{uid}</span></td>
                    <td>{loggedBy.name}</td>
                    {this.props.page === 'Home' && <td>{assignedTo.name}</td>}
                    {
                        ((department === currentUser.department) && (statusIndex !== 2 && statusIndex !== 3)) ?
                            <ChangeStatusView
                                resolveAssignedTo={assignedTo}
                                currentUser={currentUser}
                                saveAction={this.saveAction}
                                id={uid}
                                statusIndex={statusIndex}
                                handleChange={this.handleChange}
                                assignResolve={this.assignResolve}
                                resolve={this.props.resolves}
                            /> :
                            <td>
                                <span>{status}</span>
                            </td>

                    }
                </tr>
                {this.state.isModalOpen ?
                    <ModalView onClose={this.onClose} component={() => <ComplaintDetails uid={uid}/>}/> : null}
                <div className={this.state.toastClasses}>Status changed successfully</div>
            </React.Fragment>
        );
    }
}

export default ResolveRowComponent;