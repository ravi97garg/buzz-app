import React from 'react';
import Modal from "./index";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class ModalView extends React.Component {

    render() {

        const ReceivedComponent = this.props.component;
        return (
            <Modal component={
                <div>
                    <div className={'modal-title clearfix'}>
                        {this.props.modalTitle}
                        <FontAwesomeIcon
                            icon={faWindowClose}
                            color="red"
                            onClick={this.props.onClose}
                            size="lg"
                            title={'Close'}
                            className={'modal-close-btn'}
                        />
                    </div>
                    <ReceivedComponent/>
                    <div className={'modal-footer'}>
                        {this.props.modalFooter}
                    </div>
                </div>
            }
                   onClose={this.props.onClose}
            />
        )
    }
}