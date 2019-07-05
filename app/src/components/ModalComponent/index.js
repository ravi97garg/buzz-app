import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {

    componentDidMount() {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }

    render() {
        return ReactDOM.createPortal(
            <div className={'modal-overlay'}
                 onClick={this.props.onClose}
            >
                <div className={'modal-wrapper'}
                     onClick={(e) => {e.stopPropagation();}}
                >
                    {this.props.component}
                </div>
            </div>
            , modalRoot)
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].style.overflow = '';

    }

}

export default Modal;