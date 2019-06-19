import React from "react";
import {connect} from "react-redux";
import {createComplaint, getDepartments} from "../../services/complaint.service";
import {addComplaintAction, initComplaintAction} from "../../actions/complaint.action";

class ComplaintForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            complaintDepartment: '',
            complaintTitle: '',
            complaintContent: ''
        }
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitHandle = (e) => {
        e.preventDefault();
        console.log(`complaint state:   ${JSON.stringify(this.state)}`);
        const {complaintDepartment, complaintTitle, complaintContent} = this.state;
        createComplaint({complaintDepartment, complaintTitle, complaintContent})
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
            <form onSubmit={this.submitHandle} autoComplete={'off'} className={'complaint-form'}>
                <label htmlFor={'complaintDepartment'}>Department</label>
                <select
                    value={complaintDepartment}
                    required={true}
                    onChange={this.changeHandle}
                    name={'complaintDepartment'}
                >
                    {/*<option value="" disabled={true}>Department</option>*/}
                    {departments.map((department, index) => {
                        return (
                            <option value={department} key={index}>{department}</option>
                        )
                    })
                    }
                </select>
                <label htmlFor={'complaintTitle'}>Complaint Title</label>
                <input type={'text'}
                       name={'complaintTitle'}
                       onChange={this.changeHandle}
                       required={true}
                       value={complaintTitle}
                       autoComplete={'off'}
                />

                <label htmlFor={'complaintContent'}>Your Concern</label>
                <input type={'text'}
                       name={'complaintContent'}
                       onChange={this.changeHandle}
                       required={true}
                       value={complaintContent}
                       autoComplete={'off'}
                />

                <input type="submit" value="Log Complaint"/>

            </form>
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