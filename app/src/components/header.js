import React, {Component} from 'react';
import {connect} from "react-redux";
import {logOutUser} from "../services/user.service";

class HeaderComponent extends Component {
    render(){
        return (
            <header className={'clearfix'}>
                <div className={'container'}>
                    TTN Buzz
                    <button className={'header-btn'}
                            onClick={() => {
                                localStorage.clear();
                                this.props.logOutUser();
                            }}
                    >{localStorage.getItem('Token')?'LOGOUT':'LOGIN'}</button>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user }
};

const mapDispatchToProps = {
    logOutUser
};

const HeaderComponentConnect = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export default HeaderComponentConnect;