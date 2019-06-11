import React from "react";
import {getInitialBuzzService, getMoreBuzzs} from "../../services/buzz.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngry, faSmile, faSadTear, faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {initBuzzAction, loadMoreBuzzAction} from "../../actions/buzz.action";

class BuzzPosts extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            skip: 0,
            limit: 10,
            uptime: null,
            downtime: null,
            showLoadMore: false
        };
    }

    componentDidMount() {
        getInitialBuzzService(this.state.limit).then((res) => {
            if(res.extractedBuzzs.length > this.state.limit){
                this.setState({
                    showLoadMore: true
                })
            }
            const posts = res.extractedBuzzs.slice(0, this.state.limit);
            this.props.initBuzzAction(posts);
            this.setState({
                uptime: posts[0].postedOn,
                downtime: posts[posts.length-1].postedOn,
                skip: 1
            });
        }).catch((err) => {
            console.error(err);
        })
    }

    handleLoadMore = (e) => {
        console.log(this.props.buzz.buzzList.length, this.state.limit, this.state.skip);
        if((this.props.buzz.buzzList.length - (this.state.limit * this.state.skip)) < this.state.limit){
            getMoreBuzzs(this.state.limit, this.state.downtime).then((res) => {
                console.log(`posts are here: ${JSON.stringify(res)}`);
                const posts = res.extractedBuzzs.slice(0, this.state.limit);
                this.props.loadMoreBuzzAction(posts);
                this.setState({
                    skip: this.state.skip +1,
                    downtime: posts[posts.length-1].postedOn
                })
            })
        } else {
            // const startIndex = this.state.limit * this.state.skip;
            // const endIndex = this.props.buzz.buzzList.length;
            this.setState({
                skip: this.state.skip + 1,
                downtime: this.props.buzz.buzzList[(this.state.skip+1)*this.state.limit].postedOn
            })
        }
    };

    showLoadMore = () => {
        return (this.props.buzz.buzzList.length > this.state.skip*this.state.limit) || this.state.showLoadMore;
    };

    happyClickHandle = (e) => {
        console.log(e.target.value);
    };
    angryClickHandle = (e) => {
        console.log(e.target.value);
    };
    sadClickHandle = (e) => {
        console.log(e.target.value);
    };
    commentClickHandle = (e) => {
        console.log(e.target.value);
    };

    render(){
        return (
            <div>
                {this.props.buzz.buzzList && this.props.buzz.buzzList.slice(0, this.state.limit*this.state.skip).map((post) => {
                    return (
                        <div className={'post-wrapper'} key={post._id}>
                            <div className={'post-header'}>
                                <div className={'post-wrapper-profile-img'}>
                                    <img alt={'postedBy'} src={post.postedBy.profileImage}/>
                                </div>
                                <div className={'post-wrapper-profile-right'}>
                                    {post.postedBy.name} posted {Math.trunc((Date.now()-new Date(post.postedOn))/(1000*60))} minutes ago
                                </div>
                            </div>
                            <div className={'post-content'}>
                                {post.buzzContent}
                            </div>
                            <div className={'post-footer'}>
                                <div className={'reactions'}>
                                    <FontAwesomeIcon icon={faSmile} color="green" onClick={this.happyClickHandle} size="lg"/>
                                    <span>{post.reactions.filter((reaction) => reaction.reactionType === 'happy').length}</span>
                                    <FontAwesomeIcon icon={faAngry} color="red" onClick={this.angryClickHandle} size="lg"/>
                                    <span>{post.reactions.filter((reaction) => reaction.reactionType === 'angry').length}</span>
                                    <FontAwesomeIcon icon={faSadTear} color="orange" onClick={this.sadClickHandle} size="lg"/>
                                    <span>{post.reactions.filter((reaction) => reaction.reactionType === 'sad').length}</span>
                                    <FontAwesomeIcon icon={faCommentAlt} color="yellow" onClick={this.commentClickHandle} size="lg"/>
                                    <span>{post.comments.length}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {this.showLoadMore() && <button onClick={this.handleLoadMore}>Load More</button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        buzz: state.buzz }
};

const mapDispatchToProps = {
    initBuzzAction,
    loadMoreBuzzAction
};

const BuzzPostsConnect = connect(mapStateToProps, mapDispatchToProps)(BuzzPosts);

export default BuzzPostsConnect;