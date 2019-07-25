import React from 'react';

export default class UserRowComponent extends React.Component {

    changeUserStatus = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    saveAction = () => {
        if(this.state.activeStatus && this.state.activeStatus !== this.props.user.activeStatus){
            this.props.changeUserStatus(this.props.user._id, this.state.activeStatus)
        } else {
            console.log('hello');
        }
    };

    render() {
        const {
            name,
            role,
            activeStatus
        } = this.props.user;
        return (
            <div>
                {name}
                {role}
                <select onChange={this.changeUserStatus} name={'activeStatus'} value={activeStatus}>
                    <option value={'Active'}>Active</option>
                    <option value={'Deactive'}>Deactive</option>
                </select>
                <button onClick={this.saveAction}>
                    Commit Changes
                </button>
            </div>
        )
    }
}