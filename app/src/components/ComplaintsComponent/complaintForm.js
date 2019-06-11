import React from "react";
import {connect} from "react-redux";
import {getDepartments} from "../../services/complaint.service";

class ComplaintForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            departments: [],
            complaintDepartment: ''
        }
    }

    render() {
        const {
            complaintDepartment
        } = this.state;
        return (
            <form>
                <select
                    value={complaintDepartment}
                    required={true}
                >
                    <option value="" disabled={true}>Department</option>
                    {this.state.departments.map((department,index) => {
                        return (
                            <option value={department}>{department}</option>
                        )
                    })
                    }

                </select>

                <input type="submit" value=""/>

            </form>
        )
    }

    componentDidMount(){
        getDepartments().then((departments) => {
            console.log(departments);
            this.setState({
                departments: departments
            })
        })
    }
}



const mapStateToProps = (state) => {
    return {
        complaints: state.complaints
    }
};

const ComplaintFormConnect = connect(mapStateToProps)(ComplaintForm);

export default ComplaintFormConnect;