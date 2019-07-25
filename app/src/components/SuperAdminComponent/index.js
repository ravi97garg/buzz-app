import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {
    changeUserStatus,
    getUsers
} from "../../services/superadmin.service";
import UserRowComponent from "./userRow";

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
            <div className={'buzz'}>
                Superadmin!
                {this.props.superadmin.users && this.props.superadmin.users.map((user) => {
                    return (
                        <UserRowComponent
                            user={user}
                            changeUserStatus={this.props.changeUserStatus}
                        />
                    )
                })}

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
    getUsers,
    changeUserStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);