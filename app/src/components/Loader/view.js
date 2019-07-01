import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

class LoaderView extends Component {

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <FontAwesomeIcon icon={faSpinner}
                                 spin={true}
                                 style={{
                                     fontSize: this.props.size || "50px",
                                     color: this.props.color || "#2980b9"
                                 }}
                />
                <span className={'loader-text'}>{this.props.loadingText || 'Loading'}</span>
            </div>
        )
    }

}

export default LoaderView;