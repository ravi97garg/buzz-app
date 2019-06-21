import React from 'react';
import ModalView from "../ModalComponent/ModalView";
import ComplaintDetails from "./complaintDetails";

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
            id,
            subject,
            department,
            assignedTo: {
                name
            },
            status
        } = this.props;

        return (
            <React.Fragment>
                <tr key={id}>
                    <td onClick={() => this.openDetailsModal(id)}><span style={{textOverflow: 'ellipsis', width: '120px'}}>{id}</span></td>
                    <td>{subject}</td>
                    <td>{department}</td>
                    <td>{name}</td>
                    <td>{status}</td>
                </tr>
                {this.state.isModalOpen ? <ModalView onClose={this.onClose} component={() => <ComplaintDetails id={id} />}/> : null}
            </React.Fragment>
        );
    }

}