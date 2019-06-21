import React from 'react';

const {getTimeDifference} = require("../../utilities");

class CommentRowComponent extends React.Component {
    render() {

        const {
            profileImage,
            comment,
            commentedOn,
            commentBy
        } = this.props;

        return (
            <div className={'comment-row'}>
                <div className={'comment-img-wrapper'}>
                    <img alt={profileImage} src={profileImage}/>
                </div>
                <div className={'comment-header'}>
                    <span>{commentBy} commented {getTimeDifference(commentedOn)}</span>
                </div>
                <div className={'comment-text'}>
                    {comment}
                </div>
            </div>
        )

    }
}

export default CommentRowComponent;