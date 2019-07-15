import React, {Component} from 'react';
import {getRandomInt} from "../../utilities";
import {faSearchPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class UploadedImageComponent extends Component {

    createObjectURL = (file) => {
        if (typeof file === "string") {
            return file
        } else if (window.webkitURL) {
            return window.webkitURL.createObjectURL(file);
        } else if (window.URL && window.URL.createObjectURL) {
            return window.URL.createObjectURL(file);
        } else {
            return null
        }
    };

    handleClick = () => {
        this.props.onImageClick(this.props.index)
    };

    render() {
        return (
            <div
                className={'upload-image-container'}
                onClick={this.handleClick}
            >
                <img alt={getRandomInt(9999999)} src={this.createObjectURL(this.props.imageBlob)}/>
                <div className={'image-overlay'}>
                    {this.props.type === 'upload' ? <FontAwesomeIcon
                        icon={faTrash}
                        color="black"
                        size="lg"
                        title={'Delete Image'}
                    /> : <FontAwesomeIcon
                        icon={faSearchPlus}
                        color="black"
                        size="lg"
                        title={'Zoom Image'}
                    />}
                </div>
            </div>
        )
    }
}

export default UploadedImageComponent;