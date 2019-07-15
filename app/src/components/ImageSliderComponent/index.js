import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ImageSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    previousIndex = () => {
        const {
            currentIndex
        } = this.state;
        const {
            images: {
                length: size
            }
        } = this.props;
        this.setState({
                currentIndex: (size + currentIndex - 1) % size
            }
        )
    };

    nextIndex = () => {
        const {
            currentIndex
        } = this.state;
        const {
            images: {
                length: size
            }
        } = this.props;
        this.setState({
                currentIndex: (currentIndex + 1) % size
            }
        )
    };

    render() {
        const {
            images
        } = this.props;
        const {
            currentIndex
        } = this.state;
        return (
            <div>
                <span>Attachments</span>
                <div className={'complaint-attach'}>
                    <div className={'side-arrow'}>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            color="blue"
                            onClick={this.previousIndex}
                            size="lg"
                            title={'Previous'}
                            className={'arrow-img'}
                        />
                    </div>
                    <div className={'complaint-img-wrapper'}>
                        <img src={images[currentIndex]} alt={images[currentIndex]}/>
                    </div>
                    <div className={'side-arrow'}>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            color="blue"
                            onClick={this.nextIndex}
                            size="lg"
                            title={'Next'}
                            className='arrow-img'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ImageSlider.propTypes = {
    images: PropTypes.array.isRequired
};

ImageSlider.defaultProps = {};

export default ImageSlider;