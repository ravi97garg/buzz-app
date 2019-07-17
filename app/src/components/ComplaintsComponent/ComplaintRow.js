import React from 'react';
import ModalView from "../ModalComponent/ModalView";
import ComplaintDetails from "./ComplaintDetails";

export default class ComplaintRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

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

    render() {

        const {
            uid,
            subject,
            department,
            assignedTo: {
                name
            },
            status
        } = this.props;

        return (
            <React.Fragment>
                <tr key={uid}>
                    <td onClick={this.openDetailsModal}><span className={'text-ellipsis'}>{uid}</span></td>
                    <td>{subject}</td>
                    <td>{department}</td>
                    <td>{name}</td>
                    <td>{status}</td>
                </tr>
                {this.state.isModalOpen ? <ModalView onClose={this.onClose} component={() => <ComplaintDetails uid={uid} />}/> : null}
            </React.Fragment>
        );
    }

}