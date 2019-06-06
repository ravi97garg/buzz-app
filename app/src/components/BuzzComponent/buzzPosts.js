import React from "react";
import {getBuzzService} from "../../services/buzz.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngry, faSmile, faSadTear, faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import {createUser} from "../../actions/user.action";
import {connect} from "react-redux";

class BuzzPosts extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            skip: 0,
            limit: 10,
        };
        getBuzzService(10, 0).then((res) => {
            console.log(`resssposnsn ${res}`)
            this.setState({
                posts: res.extractedBuzzs
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    handleLoadMore = (e) => {
        this.setState({
            skip: this.state.skip+1
        }, this.afterIncreaseSkip);
        console.log(this.state.skip);
    };

    afterIncreaseSkip = () => {
        getBuzzService(this.state.limit, this.state.skip).then((response) => {
            console.log(response);
            this.setState({
                posts: [...this.state.posts, ...response.buzzs]
            })
        })
            .catch((error) => {
                console.log(error);
            })
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
                {console.log(`postsss`,this.state.posts)}
                {this.state.posts && this.state.posts.map((post) => {
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
                                    <FontAwesomeIcon icon={faCommentAlt} color="orange" onClick={this.commentClickHandle} size="lg"/>
                                    <span>{post.comments.length}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <button onClick={this.handleLoadMore}>Load More</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        buzz: state.buzz }
};

const mapDispatchToProps = {
    createBuzz
};

const BuzzPostsConnect = connect(mapStateToProps, mapDispatchToProps)(BuzzPosts);

export default BuzzPostsConnect;