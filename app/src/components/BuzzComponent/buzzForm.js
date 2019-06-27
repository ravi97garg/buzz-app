import React from "react";
import {createBuzzService} from "../../services/buzz.service";
import {connect} from "react-redux";
import UploadComponent from "../uploaderComponent";
import AttachmentUploadComponent from "../uploaderComponent/attachmentUpload";

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
        if(this.state.buzzContent){
            const formData = new FormData();
            formData.append('buzzContent', this.state.buzzContent);
            formData.append('category', this.state.category);
            formData.append('startTime', this.props.buzz.uptime);
            for (let x = 0; x < this.state.images.length; x++) {
                formData.append(`images[]`, this.state.images[x]);
            }
            console.log(`Formdata: ${JSON.stringify(formData)}`);
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
            images: e.target.files
        });
        console.log(e.target.files)
    };

    // handleImageUpload


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
                    <select name={'category'} onChange={this.handleChange}>
                        <option value={'activity'}>Activity</option>
                        <option value={'lostFound'}>Lost and Found</option>
                    </select>
                    {/*<input type={'file'} name={'images'} onChange={this.addImage} multiple={true}/>*/}
                    <UploadComponent id={'2'}
                                     addImage={this.addImage}
                                     uploaderLabel={() => <AttachmentUploadComponent id={'2'}/>}
                                     multiple={true}
                    />
                    <input type={'submit'} value={'POST'}/>
                </form>

                {/*<button onClick={this.click}>Click</button>*/}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        buzz: state.buzz }
};

const mapDispatchToProps = {
    createBuzzService
};

const BuzzFormConnect = connect(mapStateToProps, mapDispatchToProps)(BuzzFormComponent);

export default BuzzFormConnect;