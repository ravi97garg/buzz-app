import React from "react";
import {getInitialBuzzService, getMoreBuzzs} from "../../services/buzz.service";
import {connect} from "react-redux";
import {initBuzzAction, loadMoreBuzzAction} from "../../actions/buzz.action";
import PostTemplateComponent from "./postTemplate";
import {reactionService} from "../../services/reaction.service";
import {reactionAction} from "../../actions/reaction.action";

class BuzzPosts extends React.Component {

    constructor(props) {
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
            if (res.extractedBuzzs.length > this.state.limit) {
                this.setState({
                    showLoadMore: true
                })
            }
            const posts = res.extractedBuzzs.slice(0, this.state.limit);
            this.props.initBuzzAction(posts);
            this.setState({
                uptime: posts[0] ? posts[0].postedOn : null,
                downtime: posts[0] ? posts[posts.length - 1].postedOn : null,
                skip: 1
            });
        }).catch((err) => {
            console.error(err);
        })
    }

    handleLoadMore = () => {
        console.log(this.props.buzz.buzzList.length, this.state.limit, this.state.skip, this.state.downtime);
        if ((this.props.buzz.buzzList.length - (this.state.limit * this.state.skip)) < this.state.limit) {
            getMoreBuzzs(this.state.limit, this.state.downtime).then((res) => {
                const posts = res.extractedBuzzs.slice(0, this.state.limit);
                console.log(posts);
                this.props.loadMoreBuzzAction(posts);
                this.setState({
                    skip: this.state.skip + 1,
                    downtime: posts[posts.length - 1].postedOn
                })
            })
        } else {
            // const startIndex = this.state.limit * this.state.skip;
            // const endIndex = this.props.buzz.buzzList.length;
            this.setState({
                skip: this.state.skip + 1,
                downtime: this.props.buzz.buzzList[(this.state.skip + 1) * this.state.limit].postedOn
            })
        }
    };

    showLoadMore = () => {
        return (this.props.buzz.buzzList.length > this.state.skip * this.state.limit) || this.state.showLoadMore;
    };

    happyClickHandle = (buzzId) => {
        reactionService(buzzId, 'happy')
            .then((res) => {
                this.props.reactionAction(res.action, res.reactionObj, 'happy');
            });
    };
    angryClickHandle = (buzzId) => {
        reactionService(buzzId, 'angry')
            .then((res) => {
                this.props.reactionAction(res.action, res.reactionObj, 'angry');
            });
    };
    sadClickHandle = (buzzId) => {
        reactionService(buzzId, 'sad')
            .then((res) => {
                this.props.reactionAction(res.action, res.reactionObj, 'sad');
            });
    };

    render() {
        return (
            <div>
                {this.props.buzz.buzzList && this.props.buzz.buzzList.slice(0, this.state.limit * this.state.skip).map((post) => {
                    return (
                        <PostTemplateComponent
                            post={post}
                            key={post._id}
                            happyClickHandle={this.happyClickHandle}
                            angryClickHandle={this.angryClickHandle}
                            sadClickHandle={this.sadClickHandle}
                            user={this.props.user}
                        />
                    )
                })}
                {this.showLoadMore() && <button onClick={this.handleLoadMore}>Load More</button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        buzz: state.buzz,
        user: state.user
    }
};

const mapDispatchToProps = {
    initBuzzAction,
    loadMoreBuzzAction,
    reactionAction
};

const BuzzPostsConnect = connect(mapStateToProps, mapDispatchToProps)(BuzzPosts);

export default BuzzPostsConnect;