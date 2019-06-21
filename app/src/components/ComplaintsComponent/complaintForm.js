import React from "react";
import {connect} from "react-redux";
import {createComplaint, getDepartments} from "../../services/complaint.service";
import {addComplaintAction, initComplaintAction} from "../../actions/complaint.action";
import UploadComponent from "../uploaderComponent";
import AttachmentUploadComponent from "../uploaderComponent/attachmentUpload";

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
            images: e.target.files
        });
        console.log(e.target.files)
    };

    submitHandle = (e) => {
        e.preventDefault();
        const {complaintDepartment, complaintTitle, complaintContent} = this.state;
        const formData = new FormData();
        formData.append('complaintDepartment', complaintDepartment);
        formData.append('complaintTitle', complaintTitle);
        formData.append('complaintContent', complaintContent);
        for (var x = 0; x < this.state.images.length; x++) {
            formData.append(`images[]`, this.state.images[x]);
        }
        createComplaint(formData)
            .then((res) => {
                console.log(res);
                this.props.addComplaintAction(res.newComplaint);
            }).catch((err) => {
            console.error(err);
        });
        getDepartments().then((departments) => {
            this.setState({
                departments: departments,
                complaintDepartment: departments[0],
                complaintTitle: '',
                complaintContent: ''
            })
        });
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
                    />

                    <label htmlFor={'complaintContent'}>Your Concern</label>
                    <textarea
                        name={'complaintContent'}
                        onChange={this.changeHandle}
                        required={true}
                        value={complaintContent}
                        autoComplete={'off'}
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

                </form>
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


const mapStateToProps = (state) => {
    return {
        complaints: state.complaint
    }
};

const mapDispatchToProps = {
    initComplaintAction,
    addComplaintAction
};

const ComplaintFormConnect = connect(mapStateToProps, mapDispatchToProps)(ComplaintForm);

export default ComplaintFormConnect;