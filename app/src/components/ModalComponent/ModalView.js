import React from 'react';
import Index from "./index";

export default class ModalView extends React.Component {

    render() {

        const RecievedComponent = this.props.component;
        return (
            <Index component={
                <div>
                    <div className={'modal-title clearfix'}>
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