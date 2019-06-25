import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngry, faCommentAlt, faSadTear, faSmile, faPenSquare, faSave} from "@fortawesome/free-solid-svg-icons";
import {getTimeDifference} from "../../utilities";
import CommentComponent from "../CommentComponent";
import {updateBuzzContent} from "../../services/buzz.service";

export default class PostTemplateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            editBuzz: false,
            showEditIcon: true,
            buzzContent: props.post.buzzContent,
            noOfLines: props.post.buzzContent.split("\n").length
        };
        this.textInput = React.createRef();
        console.log( this.props.post.postedBy._id === this.props.user._id, this.props.post.postedBy._id, this.props.user._id);
    }

    componentDidMount() {
        document.getElementById(`post${this.props.post._id}`).style.height = this.state.noOfLines*20 +'px';
    }

    autoExpand = (field) => {

        // Reset field height
        // field.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';

    };

    activeReaction = (reactions, reaction) => {
        const reactionMatch = reactions.filter(item => item.reactedBy === this.props.user._id);
        if (reactionMatch[0] && reactionMatch[0].reactionType === reaction) {
            return 'active-reaction';
        } else {
            return null;
        }
    };

    editBuzzContent = (id) => {
        this.textInput.current.focus();
        this.setState({
            editBuzz: true,
            showEditIcon: false
        })
    };

    commentClickHandle = () => {
        this.setState({
            showComments: !this.state.showComments
        })
    };

    showCommentsClass = () => {
        if (this.state.showComments) {
            return 'show-comments'
        } else {
            return 'hide-comments'
        }
    };

    handleChange = (e) => {
        this.setState({
            buzzContent: e.target.value
        });
        if (e.target.value[e.target.value.length - 1] === '\n') {
            this.autoExpand(document.getElementById(e.target.id))
        }
    };

    saveBuzz = (id) => {
        console.log(`saving details for id ${id} ${this.state.buzzContent}`);
        this.setState({
            editBuzz: false,
            showEditIcon: true
        });
        updateBuzzContent(id, this.state.buzzContent).then((res) => {
            if(res.status === 1){
                this.props.updateBuzzAction(id, this.state.buzzContent);
            } else {
                console.error(res.message);
            }
        }).catch((err) => {
            console.error(err);
        })
    };

    render() {
        let {post, happyClickHandle, angryClickHandle, sadClickHandle} = this.props;
        return (
            <div className={'post-wrapper'}>
                <div className={'post-header'}>
                    <div className={'post-wrapper-profile-img'}>
                        <img alt={'postedBy'} src={post.postedBy.profileImage}/>
                    </div>
                    <div className={'post-wrapper-profile-right'}>
                        {post.postedBy.name} posted {getTimeDifference(post.postedOn)}
                        <span className={'post-type'}
                              style={{backgroundColor: post.category === 'activity' ? '#2980b9' : '#d3394c'}}>
                            {post.category}
                        </span>
                    </div>
                </div>
                <div className={'post-content clearfix'}>
                    <textarea
                        className={'.buzz-text'}
                        id={`post${post._id}`}
                        value={this.state.buzzContent}
                        disabled={!this.state.editBuzz}
                        onChange={this.handleChange}
                        ref={this.textInput}
                    />
                    {this.state.showEditIcon ? <FontAwesomeIcon
                        icon={faPenSquare}
                        color="blue"
                        onClick={() => this.editBuzzContent(post._id)}
                        size="lg"/> : <FontAwesomeIcon
                        icon={faSave}
                        color="green"
                        onClick={() => this.saveBuzz(post._id)}
                        size="lg"/>}
                    <div className={'post-img-wrapper'}>
                        {post.images.map((image, i) => {
                            return <img
                                key={'image' + i}
                                alt={'image' + i}
                                src={`${image.split('upload')[0]}upload/q_60,h_200${image.split('upload')[1]}`}/>
                        })}

                    </div>
                </div>
                <div className={'post-footer'}>
                    <div className={'reactions'}>
                        <FontAwesomeIcon icon={faSmile} color="green" onClick={() => happyClickHandle(post._id)}
                                         size="lg"/>
                        <span
                            className={this.activeReaction(post.reactions, 'happy')}>{post.reactions.filter((reaction) => reaction.reactionType === 'happy').length}</span>
                        <FontAwesomeIcon icon={faAngry} color="red" onClick={() => angryClickHandle(post._id)}
                                         size="lg"/>
                        <span
                            className={this.activeReaction(post.reactions, 'angry')}>{post.reactions.filter((reaction) => reaction.reactionType === 'angry').length}</span>
                        <FontAwesomeIcon icon={faSadTear} color="orange" onClick={() => sadClickHandle(post._id)}
                                         size="lg"/>
                        <span
                            className={this.activeReaction(post.reactions, 'sad')}>{post.reactions.filter((reaction) => reaction.reactionType === 'sad').length}</span>
                        <FontAwesomeIcon icon={faCommentAlt} color="yellow" onClick={this.commentClickHandle}
                                         size="lg"/>
                        <span>{post.comments.length}</span>
                        <CommentComponent buzzId={post._id} post={post} className={this.showCommentsClass()}/>
                    </div>
                </div>
            </div>
        )
    }

}