import {NavLink} from 'react-router-dom'
import React from "react";
import {connect} from "react-redux";
import UploadComponent from "./uploaderComponent";
import ProfileUploadComponent from "./uploaderComponent/profileUpload";
import {changeProfileService} from "../services/user.service";
import {changeProfileImageAction} from "../actions/user.action";

class NavLinkComponent extends React.Component {

    changeProfile = (e) => {
        console.log('yahaa');
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        changeProfileService(formData).then((res) => {
            console.log(res.imageUrl);
            this.props.changeProfileImageAction(res.imageUrl);
            localStorage.setItem('Token', res.token);
        }).catch((err) => {
            console.error(err);
        })
    };

    render() {
        return (
            <div className={'nav-container'}>
                <UploadComponent id={'3'}
                                 addImage={this.changeProfile}
                                 uploaderLabel={() => <ProfileUploadComponent id={'3'}
                                                                              profileImage={this.props.user.profileImage}/>}
                                 multiple={false}
                />
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
                {this.props.user.role === 'Admin' &&
                <NavLink to="/resolve" className={'nav-options'} activeClassName="selected-nav" activeStyle={{
                    color: "white"
                }}>
                    Resolve
                </NavLink>}

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = {
    changeProfileImageAction
};

const NavLinkConnect = connect(mapStateToProps, mapDispatchToProps)(NavLinkComponent);


export default NavLinkConnect;