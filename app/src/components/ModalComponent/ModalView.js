import React from 'react';
import Modal from "../modal";

export default class ModalView extends React.Component {

    render() {

        const RecievedComponent = this.props.component;
        return (
            <Modal component={
                <div>
                    <div className={'modal-title'}>
                        {this.props.modalTitle}
                        <button className={'modal-close-btn'} onClick={this.props.onClose}>
                            x
                        </button>
                    </div>
                    <RecievedComponent/>
                    <div className={'modal-footer'}>
                        {this.props.modalFooter}
                    </div>
                </div>
            }/>
        )
    }
}