import React, {Component} from 'react';
import Modal from "./index";

class ImageModalView extends Component {


    render() {
        return (
            <Modal component={
                <div className={'image-full-view-modal'}>
                    <img alt={this.props.imageUrl} src={this.props.imageUrl}/>
                    <a
                        download={this.props.imageUrl}
                        href={this.props.imageUrl}
                        title="Download Image"
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                    >
                        Download Image
                    </a>
                </div>
            }
                   onClose={this.props.onClose}
            />
        )
    }

}

export default ImageModalView;