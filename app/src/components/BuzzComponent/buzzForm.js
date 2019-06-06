import React from "react";
import {createBuzzService} from "../../services/buzz.service";
import axiosInstance from "../../config/axios";

export default class BuzzFormComponent extends React.Component {

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
            this.setState({
                buzzContent: '',
                category: 'activity',
                images: []
            });
            createBuzzService(this.state);
        } else {
            alert('Write something in buzz field');
        }

    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    addImage = (image) => {
        const newImages = this.state.images;
        newImages.unshift(image);
        this.setState({
            images: newImages
        })
    };

    click = () => axiosInstance.get(`/data`)
        .then(response => (console.log(response)))
        .catch(error => (console.log(error)));

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
                    <input type={'submit'} value={'POST'}/>
                </form>

                {/*<button onClick={this.click}>Click</button>*/}
            </div>
        )
    }

}