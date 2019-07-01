import React from 'react';

class ProfileUploadComponent extends React.Component {

    render() {
        return (
            <label htmlFor={this.props.id}>
                <div className={'nav-profile-img-wrapper'}>
                    <img alt={'profile'} src={this.props.profileImage}/>
                </div>
                {/*<span>Choose a file&hellip;</span>*/}
            </label>
        )
    }

}

export default ProfileUploadComponent;