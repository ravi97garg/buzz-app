import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngry, faCommentAlt, faSadTear, faSmile} from "@fortawesome/free-solid-svg-icons";
import {getTimeDifference} from "../../utilities";
import CommentComponent from "../CommentComponent";

export default class PostTemplateComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showComments: false
        }
    }

    activeReaction = (reactions, reaction) => {
        const reactionMatch = reactions.filter(item => item.reactedBy === this.props.user._id);
        if(reactionMatch[0] && reactionMatch[0].reactionType === reaction) {
            return 'active-reaction';
        } else {
            return null;
        }
    };

    commentClickHandle = () => {
        this.setState({
            showComments: !this.state.showComments
        })
    };

    showCommentsClass = () => {
        if(this.state.showComments){
            return 'show-comments'
        } else {
            return 'hide-comments'
        }
    };

    render(){
        let {post, happyClickHandle, angryClickHandle, sadClickHandle} = this.props;
        return (
            <div className={'post-wrapper'}>
                <div className={'post-header'}>
                    <div className={'post-wrapper-profile-img'}>
                        <img alt={'postedBy'} src={post.postedBy.profileImage}/>
                    </div>
                    <div className={'post-wrapper-profile-right'}>
                        {post.postedBy.name} posted {getTimeDifference(post.postedOn)}
                        <span className={'post-type'} style={{backgroundColor: post.category === 'activity' ? '#2980b9' : '#d3394c'}}>{post.category}</span>
                    </div>
                </div>
                <div className={'post-content'}>
                    {post.buzzContent}
                    <div className={'post-img-wrapper'}>
                        {post.images.map((image, i) => {
                            return <img key={'image'+i} alt={'image'+i} src={`${image.split('upload')[0]}upload/q_60,h_200${image.split('upload')[1]}`}/>
                        })}

                    </div>
                </div>
                <div className={'post-footer'}>
                    <div className={'reactions'}>
                        <FontAwesomeIcon icon={faSmile} color="green" onClick={() => happyClickHandle(post._id)} size="lg"/>
                        <span className={this.activeReaction(post.reactions, 'happy')}>{post.reactions.filter((reaction) => reaction.reactionType === 'happy').length}</span>
                        <FontAwesomeIcon icon={faAngry} color="red" onClick={() => angryClickHandle(post._id)} size="lg"/>
                        <span className={this.activeReaction(post.reactions, 'angry')}>{post.reactions.filter((reaction) => reaction.reactionType === 'angry').length}</span>
                        <FontAwesomeIcon icon={faSadTear} color="orange" onClick={() => sadClickHandle(post._id)} size="lg"/>
                        <span className={this.activeReaction(post.reactions, 'sad')}>{post.reactions.filter((reaction) => reaction.reactionType === 'sad').length}</span>
                        <FontAwesomeIcon icon={faCommentAlt} color="yellow" onClick={this.commentClickHandle} size="lg"/>
                        <span>{post.comments.length}</span>
                        <CommentComponent buzzId={post._id} post={post} className={this.showCommentsClass()}/>
                    </div>
                </div>
            </div>
        )
    }

}