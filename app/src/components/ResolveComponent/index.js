import React from "react";
import {addComplaintAction, initComplaintAction} from "../../actions/complaint.action";
import {connect} from "react-redux";

class ResolveComponent extends React.Component {

    componentDidMount() {
        if(this.props.user.role !== 'Admin'){
            this.props.history.push('/pageNotFound');
        }
    }

    render(){
        return (
            <div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        complaints: state.complaint,
        user: state.user
    }
};

const mapDispatchToProps = {
    initComplaintAction,
    addComplaintAction
};

const ResolveComponentConnect = connect(mapStateToProps, mapDispatchToProps)(ResolveComponent);

export default ResolveComponentConnect;