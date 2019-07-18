import React from "react";
import {getDepartments} from "../../services/complaint.service";
import UploadComponent from "../UploaderComponent";
import AttachmentUploadComponent from "../UploaderComponent/AttachmentUpload";
import {ADD_COMPLAINT_SUCCESS} from "../../constants/complaints";
import ImagesContainer from "../BuzzComponent/ImagesContainer";
import ToastComponent from "../ToastComponent";

class ComplaintForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            complaintDepartment: '',
            complaintTitle: '',
            complaintContent: '',
            images: []
        }
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
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

    submitHandle = (e) => {
        e.preventDefault();
        const {complaintDepartment, complaintTitle, complaintContent} = this.state;
        if(complaintTitle.trim() && complaintContent.trim()){
            const formData = new FormData();
            formData.append('complaintDepartment', complaintDepartment);
            formData.append('complaintTitle', complaintTitle.trim());
            formData.append('complaintContent', complaintContent.trim());
            for (let x = 0; x < this.state.images.length; x++) {
                formData.append(`images[]`, this.state.images[x]);
            }
            this.props.createComplaint(formData);
            getDepartments().then((departments) => {
                this.setState({
                    departments: departments,
                    complaintDepartment: departments[0],
                    complaintTitle: '',
                    complaintContent: ''
                })
            });
        } else {
            alert("Fill something in Complaint Box");
        }

    };

    render() {
        const {
            complaintDepartment,
            departments,
            complaintTitle,
            complaintContent
        } = this.state;
        return (
            <div className={'buzz-form clearfix'}>
                <form onSubmit={this.submitHandle} autoComplete={'off'} className={'complaint-form'}>
                    <label htmlFor={'complaintTitle'}>Complaint Title</label>
                    <input type={'text'}
                           name={'complaintTitle'}
                           onChange={this.changeHandle}
                           required={true}
                           value={complaintTitle}
                           autoComplete={'off'}
                           placeholder={'Complaint Subject Here'}
                    />

                    <label htmlFor={'complaintContent'}>Your Concern</label>
                    <textarea
                        name={'complaintContent'}
                        onChange={this.changeHandle}
                        required={true}
                        value={complaintContent}
                        autoComplete={'off'}
                        placeholder={'Complaint Details Here'}
                    />
                    <label htmlFor={'complaintDepartment'}>Department</label>
                    <select
                        value={complaintDepartment}
                        required={true}
                        onChange={this.changeHandle}
                        name={'complaintDepartment'}
                    >
                        {departments.map((department, index) => {
                            return (
                                <option value={department} key={index}>{department}</option>
                            )
                        })
                        }
                    </select>
                    <UploadComponent addImage={this.addImage}
                                     id={'1'}
                                     uploaderLabel={() => <AttachmentUploadComponent id={'1'}/>}
                                     multiple={true}
                    />
                    <input type="submit" value="Log Complaint"/>
                    <ImagesContainer
                        images={this.state.images}
                        type={'upload'}
                        onImageClick={this.deleteImage}
                    />
                </form>
                {this.props.complaints.complaintStatus === ADD_COMPLAINT_SUCCESS &&
                <ToastComponent
                    message={'Complaint added successfully'}
                    setStatusDefaultService={this.props.setComplaintStatusDefaultService}
                />}
            </div>
        )
    }

    componentDidMount() {
        getDepartments().then((departments) => {
            this.setState({
                departments: departments,
                complaintDepartment: departments[0]
            })
        })
    }
}

export default ComplaintForm;