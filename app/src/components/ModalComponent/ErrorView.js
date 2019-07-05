import React from 'react';
import Index from "./index";

export default class ErrorView extends React.Component {

    render() {

        const ReceivedComponent = this.props.component;
        return (
            <Index component={
                <div>
                    <div className={'modal-title'}>
                        {this.props.modalTitle}
                        <button className={'modal-close-btn'} onClick={this.props.onClose}>
                            x
                        </button>
                    </div>
                    <ReceivedComponent/>
                    <div className={'modal-footer'}>
                        {this.props.modalFooter}
                    </div>
                </div>
            }/>
        )
    }
}