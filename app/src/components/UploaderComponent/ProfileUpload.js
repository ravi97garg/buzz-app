import React from 'react';

class ProfileUploadComponent extends React.Component {

    render() {
        return (
            <label htmlFor={this.props.id}>
                <div className={'nav-profile-img-wrapper'}>
                    <img alt={'profile'} src={this.props.profileImage}/>
                </div>
            </label>
        )
    }
}

export default ProfileUploadComponent;