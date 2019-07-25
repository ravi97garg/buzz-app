import {NavLink} from 'react-router-dom'
import React from "react";
import {connect} from "react-redux";
import UploadComponent from "../UploaderComponent";
import ProfileUploadComponent from "../UploaderComponent/ProfileUpload";
import {changeProfileImageService} from "../../services/user.service";

class NavLinkComponent extends React.Component {

    changeProfile = (e) => {
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        this.props.changeProfileImageService(formData);
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
                {(this.props.user.role === 'Admin' || this.props.user.role === 'Super Admin') &&
                <NavLink to="/resolve" className={'nav-options'} activeClassName="selected-nav" activeStyle={{
                    color: "white"
                }}>
                    Resolve
                </NavLink>}
                {(this.props.user.role === 'Super Admin') &&
                <NavLink to="/admin" className={'nav-options'} activeClassName="selected-nav" activeStyle={{
                    color: "white"
                }}>
                    Manage Users
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
    changeProfileImageService
};

const NavLinkConnect = connect(mapStateToProps, mapDispatchToProps)(NavLinkComponent);


export default NavLinkConnect;