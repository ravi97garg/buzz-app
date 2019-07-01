import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Index extends React.Component {

    componentDidMount() {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }

    render() {
        return ReactDOM.createPortal(
            <div className={'modal-overlay'}>
                <div className={'modal-wrapper'}>
                    {this.props.component}
                </div>
            </div>
            , modalRoot)
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].style.overflow = '';

    }

}

export default Index;