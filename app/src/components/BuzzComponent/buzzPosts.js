import React from "react";
import {
    getInitialBuzzService,
    getMoreBuzzService, reportBuzz,
    setBuzzStatusDefaultAction,
    updateBuzzContent
} from "../../services/buzz.service";
import {connect} from "react-redux";
import PostTemplateComponent from "./postTemplate";
import {reactionService} from "../../services/reaction.service";
import {REACTION, STATUS} from "../../constants";
import ErrorView from "../ModalComponent/ErrorView";
import ErrorDetailsComponent from "../ErrorDetailsComponent";

class BuzzPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 10,
            uptime: null,
            downtime: null,
            showLoadMore: this.props.buzz.showLoadMore
        };
        console.log(this.props.user);
    }

    handleLoadMore = () => {
        if ((this.props.buzz.buzzList.length - (this.state.limit * this.state.skip)) < this.state.limit) {
            this.props.getMoreBuzzService(this.state.limit, this.state.downtime);
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
        return (this.props.buzz.buzzList.length > this.state.skip * this.state.limit) || this.props.buzz.showLoadMore;
    };

    happyClickHandle = (buzzId) => {
        this.props.reactionService(buzzId, REACTION.HAPPY);
    };
    angryClickHandle = (buzzId) => {
        this.props.reactionService(buzzId, REACTION.ANGRY);
    };
    sadClickHandle = (buzzId) => {
        this.props.reactionService(buzzId, REACTION.SAD);
    };

    onClose = () => {
        this.props.setBuzzStatusDefaultAction();
    };

    componentDidMount() {
        console.log(this.props.user);
        this.props.getInitialBuzzService(this.state.limit);
        console.log(this.props.buzz.buzzStatus);

        window.onscroll = () => {
            if (this.props.buzz.buzzStatus !== STATUS.STARTED && (window.innerHeight + window.scrollY+1) + 200 >= document.body.offsetHeight) {
                if(this.showLoadMore()){
                    this.handleLoadMore();
                }
            }
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.buzz.buzzStatus === STATUS.SUCCESS){
            this.setState({
                uptime: this.props.buzz.buzzList[0] ? this.props.buzz.buzzList[0].postedOn : null,
                downtime: this.props.buzz.buzzList[0] ? this.props.buzz.buzzList[this.props.buzz.buzzList.length - 1].postedOn : null,
                skip: this.state.skip + 1
            });
            this.props.setBuzzStatusDefaultAction();
        } else if (this.props.buzz.buzzStatus === STATUS.FAILED) {
            console.error(`err`);
        }

    }

    render() {
        return (
            <div>
                {this.props.buzz.buzzStatus === STATUS.FAILED ? <ErrorView onClose={this.onClose} component={() => <ErrorDetailsComponent />}/> :
                    this.props.buzz.buzzList.length>0 && this.props.buzz.buzzList.slice(0, this.state.limit * this.state.skip).map((post) => {
                        return (
                            <PostTemplateComponent
                                post={post}
                                key={post._id}
                                happyClickHandle={this.happyClickHandle}
                                angryClickHandle={this.angryClickHandle}
                                sadClickHandle={this.sadClickHandle}
                                user={this.props.user}
                                updateBuzzContent = {this.props.updateBuzzContent}
                                reportBuzz={this.props.reportBuzz}
                            />
                        )
                    })}
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
    getInitialBuzzService,
    getMoreBuzzService,
    setBuzzStatusDefaultAction,
    reactionService,
    updateBuzzContent,
    reportBuzz
};

const BuzzPostsConnect = connect(mapStateToProps, mapDispatchToProps)(BuzzPosts);

export default BuzzPostsConnect;