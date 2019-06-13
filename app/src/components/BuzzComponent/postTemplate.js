import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngry, faCommentAlt, faSadTear, faSmile} from "@fortawesome/free-solid-svg-icons";
import {getTimeDifference} from "../../utilities";

export default class PostTemplateComponent extends React.Component{

    render(){
        let {post, happyClickHandle, angryClickHandle, sadClickHandle, commentClickHandle} = this.props;
        return (
            <div className={'post-wrapper'}>
                <div className={'post-header'}>
                    <div className={'post-wrapper-profile-img'}>
                        <img alt={'postedBy'} src={post.postedBy.profileImage}/>
                    </div>
                    <div className={'post-wrapper-profile-right'}>
                        {post.postedBy.name} posted {getTimeDifference(post.postedOn)} ago
                    </div>
                </div>
                <div className={'post-content'}>
                    {post.buzzContent}
                </div>
                <div className={'post-footer'}>
                    <div className={'reactions'}>
                        <FontAwesomeIcon icon={faSmile} color="green" onClick={() => happyClickHandle(post._id)} size="lg"/>
                        <span>{post.reactions.filter((reaction) => reaction.reactionType === 'happy').length}</span>
                        <FontAwesomeIcon icon={faAngry} color="red" onClick={() => angryClickHandle(post._id)} size="lg"/>
                        <span>{post.reactions.filter((reaction) => reaction.reactionType === 'angry').length}</span>
                        <FontAwesomeIcon icon={faSadTear} color="orange" onClick={() => sadClickHandle(post._id)} size="lg"/>
                        <span>{post.reactions.filter((reaction) => reaction.reactionType === 'sad').length}</span>
                        <FontAwesomeIcon icon={faCommentAlt} color="yellow" onClick={() => commentClickHandle(post._id)} size="lg"/>
                        {/*<span>{post.comments.length}</span>*/}
                    </div>
                </div>
            </div>
        )
    }

}