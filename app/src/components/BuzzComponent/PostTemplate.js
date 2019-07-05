import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngry,
    faCommentAlt,
    faSadTear,
    faSmile,
    faPenSquare,
    faSave,
    faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import {getTimeDifference} from "../../utilities";
import CommentComponent from "../CommentComponent";
import {REACTION} from "../../constants";
import ImagesContainer from "./ImagesContainer";
import ImageModalView from "../ModalComponent/ImageView";

export default class PostTemplateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showComments: false,
            editBuzz: false,
            showEditIcon: true,
            buzzContent: props.post.buzzContent,
            noOfLines: props.post.buzzContent.split("\n").length,
            showFullSizeImage: false,
            zoomImage: null
        };
        this.textInput = React.createRef();
    }

    componentDidMount() {
        const {
            post: {
                _id
            }
        } = this.props;
        document.getElementById(`post${_id}`).style.height = this.state.noOfLines*20 +'px';
    }

    autoExpand = (field) => {

        const computed = window.getComputedStyle(field);

        const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';
    };

    activeReaction = (reactions, reaction) => {
        const {
            user
        } = this.props;
        const reactionMatch = reactions.filter(item => item.reactedBy === user._id);
        if (reactionMatch[0] && reactionMatch[0].reactionType === reaction) {
            return 'icon-count active-reaction';
        } else {
            return 'icon-count';
        }
    };

    editBuzzContent = () => {
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

    zoomImage = (index) => {
        console.log('hi');
        this.setState({
            showFullSizeImage: true,
            zoomImage: this.props.post.images[index]
        })
    };

    onCloseImageModal = () => {
        this.setState({
            showFullSizeImage: false
        })
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
        const {
            updateBuzzContent
        } = this.props;
        this.setState({
            editBuzz: false,
            showEditIcon: true
        });
        updateBuzzContent(id, this.state.buzzContent);
    };

    report = (id) => {
        const {
            reportBuzz
        } = this.props;
        reportBuzz(id);
    };

    render() {
        let {
            post: {
                _id,
                postedBy,
                postedOn,
                category,
                images,
                reactions,
                comments
            },
            user,
            happyClickHandle,
            angryClickHandle,
            sadClickHandle
        } = this.props;
        return (
            <div className={'post-wrapper'}>
                <div className={'post-header'}>
                    <div className={'post-wrapper-profile-img'}>
                        <img alt={'postedBy'} src={postedBy.profileImage}/>
                    </div>
                    <div className={'post-wrapper-profile-right'}>
                        {postedBy.name} posted {getTimeDifference(postedOn)}
                        <span className={'post-type'}
                              style={{backgroundColor: category === 'activity' ? '#2980b9' : '#d3394c'}}>
                            {category}
                        </span>
                    </div>
                </div>
                <div className={'post-content clearfix'}>
                    <textarea
                        className={'.buzz-text'}
                        id={`post${_id}`}
                        value={this.state.buzzContent}
                        disabled={!this.state.editBuzz}
                        onChange={this.handleChange}
                        ref={this.textInput}
                    />
                    {postedBy._id === user._id ? (this.state.showEditIcon ? <FontAwesomeIcon
                        icon={faPenSquare}
                        color="blue"
                        onClick={this.editBuzzContent}
                        size="lg"
                        title={'Edit Buzz'}
                    /> : <FontAwesomeIcon
                        icon={faSave}
                        color="green"
                        onClick={() => this.saveBuzz(_id)}
                        size="lg"
                        title={'Save Changes'}
                    />) : <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        color="yellow"
                        onClick={() => this.report(_id)}
                        size="lg"
                        title={'Report Post'}
                    />}
                    <ImagesContainer images={images} type={'view'} onImageClick={this.zoomImage}/>
                </div>
                <div className={'post-footer'}>
                    <div className={'reactions'}>
                        <FontAwesomeIcon
                            icon={faSmile}
                            color="green"
                            onClick={() => happyClickHandle(_id)}
                            size="lg"
                            title={"Happy"}/>
                        <span className={this.activeReaction(reactions,  REACTION.HAPPY)}>
                            {reactions.filter((reaction) => reaction.reactionType === REACTION.HAPPY).length}
                        </span>
                        <FontAwesomeIcon
                            icon={faAngry}
                            color="red"
                            onClick={() => angryClickHandle(_id)}
                            size="lg"
                            title={"Angry"}/>
                        <span className={this.activeReaction(reactions, REACTION.ANGRY)}>
                            {reactions.filter((reaction) => reaction.reactionType === REACTION.ANGRY).length}
                        </span>
                        <FontAwesomeIcon
                            icon={faSadTear}
                            color="orange"
                            onClick={() => sadClickHandle(_id)}
                            size="lg"
                            title={"Sad"}/>
                        <span className={this.activeReaction(reactions, REACTION.SAD)}>
                            {reactions.filter((reaction) => reaction.reactionType === REACTION.SAD).length}
                        </span>
                        <FontAwesomeIcon icon={faCommentAlt} color="yellow" onClick={this.commentClickHandle}
                                         size="lg"
                                         title={"Comment"}
                        />
                        <span className={'icon-count'}>
                            {comments.length}
                        </span>
                        <CommentComponent
                            buzzId={_id}
                            post={this.props.post}
                            className={this.showCommentsClass()}
                        />
                    </div>
                </div>
                {this.state.showFullSizeImage && <ImageModalView imageUrl={this.state.zoomImage} onClose={this.onCloseImageModal}/>}
            </div>
        )
    }

}