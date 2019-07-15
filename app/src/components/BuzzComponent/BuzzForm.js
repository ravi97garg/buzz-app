import React from "react";
import UploadComponent from "../UploaderComponent";
import AttachmentUploadComponent from "../UploaderComponent/AttachmentUpload";
import {CREATE_BUZZ_STARTED} from "../../constants/buzz";
import LoaderView from "../Loader/view";
import {addCarriageReturn} from "../../utilities";
import ImagesContainer from "./ImagesContainer";

class BuzzFormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buzzContent: '',
            category: 'activity',
            images: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.buzzContent.trim()) {
            const formData = new FormData();
            formData.append('buzzContent', addCarriageReturn(this.state.buzzContent.trim(), 50));
            formData.append('category', this.state.category);
            formData.append('startTime', this.props.buzz.uptime);
            for (let x = 0; x < this.state.images.length; x++) {
                formData.append(`images[]`, this.state.images[x]);
            }
            this.props.createBuzzService(formData);
            this.setState({
                buzzContent: '',
                category: 'activity',
                images: []
            });
            e.target.reset();
        } else {
            alert('Write something in buzz field');
        }

    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    addImage = (e) => {
        this.setState({
            images: this.state.images.concat(Array.from(e.target.files))
        });
    };

    deleteImage = (index) => {
        this.setState({
            images: this.state.images.filter((val, i) => {return i!== index})
        })
    };

    render() {
        return (
            <div className={'buzz-form clearfix'}>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        onChange={this.handleChange}
                        name={'buzzContent'}
                        value={this.state.buzzContent}
                        placeholder={'Create your own buzz...'}
                    />
                    <div>
                        <select name={'category'} onChange={this.handleChange}>
                            <option value={'activity'}>Activity</option>
                            <option value={'lostFound'}>Lost and Found</option>
                        </select>
                        <UploadComponent id={'2'}
                                         addImage={this.addImage}
                                         uploaderLabel={() => <AttachmentUploadComponent id={'2'}/>}
                                         multiple={true}
                        />
                        <input type={'submit'} value={'POST'}/>
                    </div>
                    <ImagesContainer
                        images={this.state.images}
                        type={'upload'}
                        onImageClick={this.deleteImage}
                    />
                </form>
                {this.props.buzz.buzzStatus === CREATE_BUZZ_STARTED && <LoaderView loadingText={'Please Wait!'}/>}
            </div>
        )
    }
}

export default BuzzFormComponent;