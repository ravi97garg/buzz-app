import React from 'react';

import {
    USER_ROLES,
    USER_STATUSES
} from "../../constants/user";

export default class UserRowComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeStatus: props.user.activeStatus,
            role: props.user.role
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    saveAction = () => {
        const {
            activeStatus: statusInState,
            role: roleInState
        } = this.state;
        const {
            _id: userId,
            activeStatus: statusInProps,
            role: roleInProps
        } = this.props.user;
        if(statusInState !== statusInProps || roleInState !== roleInProps){
            this.props.changeUserStatus(userId, statusInState, roleInState)
        }
    };

    render() {
        const {
            name
        } = this.props.user;
        const {
            activeStatus,
            role
        } = this.state;
        return (
            <div>
                {name}
                <select onChange={this.handleChange} name={'role'} value={role}>
                    {Object.values(USER_ROLES).map((userRole) => {
                        return (
                            <option value={userRole}>{userRole}</option>
                        )
                    })}
                </select>
                <select onChange={this.handleChange} name={'activeStatus'} value={activeStatus}>
                    {Object.values(USER_STATUSES).map((userStatus) => {
                        return (
                            <option value={userStatus}>{userStatus}</option>
                        )
                    })}
                </select>
                <button onClick={this.saveAction}>
                    Commit Changes
                </button>
            </div>
        )
    }
}