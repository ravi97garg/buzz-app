import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getUsers} from "../../services/superadmin.service";

class SuperAdmin extends Component {

    componentDidMount() {
        if (this.props.user.role && this.props.user.role !== 'Super Admin') {
            this.props.history.push('/pageNotFound');
        } else {
            this.props.getUsers();
        }
    }

    componentDidUpdate() {
        if (this.props.user.role && this.props.user.role !== 'Super Admin') {
            this.props.history.push('/pageNotFound');
        }
    }

    render(){
        console.log(this.props.superadmin.users);
        return (
            <div>
                Superadmin!
            </div>
        )
    }

}

SuperAdmin.propTypes = {
    users: PropTypes.array.isRequired
};

SuperAdmin.defaultProps = {
    users: []
};

const mapStateToProps = (state) => {
    return {
        superadmin: state.superadmin,
        user: state.user
    }
};

const mapDispatchToProps = {
    getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);