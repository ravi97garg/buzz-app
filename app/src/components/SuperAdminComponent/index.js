import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {
    changeUserStatus,
    getUsers
} from "../../services/superadmin.service";
import UserRowComponent from "./userRow";
import TableComponent from "../TableComponent";
import {USER_ROLES, USER_STATUSES} from "../../constants/user";

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

    render() {
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
                <TableComponent
                    columns={[
                        {title: 'Name', type: 'normal', dataKey: 'name'},
                        {title: 'Role', type: 'dropdown', dataKey: 'role', optionList: Object.values(USER_ROLES)},
                        {title: 'Account Status', type: 'dropdown', dataKey: 'activeStatus', optionList: Object.values(USER_STATUSES)},
                        {title: 'Action', type: 'button', onClickHandler: this.props.changeUserStatus, value: 'Commit'}
                    ]}
                    dataList={this.props.superadmin.users}
                />
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