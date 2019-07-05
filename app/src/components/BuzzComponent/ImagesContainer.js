import React, {Component} from 'react';
import UploadedImageComponent from "./UploadedImage";
import {getRandomInt} from "../../utilities";

class ImagesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showUploadImages: false
        }
    }
    

    showAllUploadImages = () => {
        this.setState({
            showUploadImages: !this.state.showUploadImages
        })
    };

    render() {
        return (
            <div>
                {this.props.images.length > 4 && !this.state.showUploadImages ?
                    <React.Fragment>
                        {this.props.images.slice(0, 3).map((imageBlob,  index) =>
                            <UploadedImageComponent
                                imageBlob={imageBlob}
                                key={getRandomInt(9999999)}
                                type={this.props.type}
                                index={index}
                                onImageClick={this.props.onImageClick}
                            />
                        )}
                        <div className={'upload-image-container blank-wrapper'}
                             onClick={this.showAllUploadImages}>
                            +{this.props.images.length - 3} more
                        </div>
                    </React.Fragment>
                    : <React.Fragment>{this.props.images.map((imageBlob,  index) =>
                        <UploadedImageComponent
                            imageBlob={imageBlob}
                            key={getRandomInt(9999999)}
                            type={this.props.type}
                            index={index}
                            onImageClick={this.props.onImageClick}
                        />
                    )}
                        {this.props.images.length > 4 &&
                        <div className={'upload-image-container blank-wrapper'}
                             onClick={this.showAllUploadImages}>
                            Hide images
                        </div>}
                    </React.Fragment>}
            </div>
        )
    }

}

export default ImagesContainer;