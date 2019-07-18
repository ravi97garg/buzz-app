import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ToastComponent extends Component {

    state = {
        toastClasses: 'snackbar'
    };

    componentDidMount() {
        this.setToast();
    }

    setToast = () => {
        this.setState({
            toastClasses: this.state.toastClasses + ' show-toast'
        });

        setTimeout(() => {
            this.setState({
                toastClasses: 'snackbar'
            }, () => this.props.setStatusDefaultService && this.props.setStatusDefaultService());
        }, 3000)
    };

    render(){
        return (
            <div className={this.state.toastClasses}>
                {this.props.message}
            </div>
        )
    }

}

ToastComponent.propTypes = {
    message: PropTypes.string.isRequired,
    setStatusDefaultService: PropTypes.func
};

ToastComponent.defaultProps = {
    message: 'Operation done successfully'
};

export default ToastComponent;