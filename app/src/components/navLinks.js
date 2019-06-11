import { NavLink } from 'react-router-dom'
import React from "react";
import {connect} from "react-redux";
import {transform} from "@babel/core";

class NavLinkComponent extends React.Component{
    constructor(props){
        super(props);
        console.log(`propsrwtw ${JSON.stringify(props)}   fjv ${props}`);
    }
    render(){
        return (
            <div className={'nav-container'}>
                <div className={'nav-profile-img-wrapper'}>
                    <img alt={'profile'} src={this.props.user.profileImage}/>
                </div>
                <div className={'nav-profile-info-wrapper'}>
                    <span>{this.props.user.name}</span><br/>
                    <span>{this.props.user.role} @ {this.props.user.department}</span>
                </div>
                <NavLink to="/dashboard" className={'nav-options'} activeClassName="selected-nav" activeStyle={{
                    color: "white"
                }}>
                    Buzz
                </NavLink>
                <NavLink to="/complaints" className={'nav-options'} activeClassName="selected-nav" activeStyle={{
                    color: "white"
                }}>
                    Complaints
                </NavLink>
                {this.props.user.role === 'Admin' && <NavLink to="/resolve" className={'nav-options'} activeClassName="selected-nav" activeStyle={{
                    color: "white"
                }}>
                    Resolve
                    </NavLink>}

            </div>

        )
    }
}

const mapStateToProps = (state) =>
{return {
    user: state.user}
};

const NavLinkConnect = connect(mapStateToProps)(NavLinkComponent);


export default NavLinkConnect;