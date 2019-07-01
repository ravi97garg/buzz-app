import React, {Fragment} from "react";
import PostTemplateComponent from "./PostTemplate";
import {REACTION, STATUS} from "../../constants";
import ErrorView from "../ModalComponent/ErrorView";
import ErrorDetailsComponent from "../ErrorDetailsComponent";
import LoaderView from "../Loader/view";

class BuzzPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 10,
            uptime: null,
            downtime: null,
            showLoadMore: props.buzz.showLoadMore
        };
    }

    handleLoadMore = () => {
        if ((this.props.buzz.buzzList.length - (this.state.limit * this.state.skip)) < this.state.limit) {
            this.props.getMoreBuzzService(this.state.limit, this.state.downtime);
        } else {
            this.setState({
                skip: this.state.skip + 1,
                downtime: this.props.buzz.buzzList[(this.state.skip + 1) * this.state.limit].postedOn
            })
        }
    };

    onScrollEvent = () => {
        if (this.props.buzz.buzzStatus !== STATUS.STARTED && (window.innerHeight + window.scrollY + 1) + 200 >= document.body.offsetHeight) {
            if (this.showLoadMore()) {
                this.handleLoadMore();
            }
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
        this.props.getInitialBuzzService(this.state.limit);
        window.addEventListener('scroll', this.onScrollEvent);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.buzz.buzzStatus === STATUS.SUCCESS) {
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
                {this.props.buzz.buzzStatus === STATUS.FAILED ?
                    <ErrorView onClose={this.onClose} component={() => <ErrorDetailsComponent/>}/> :
                    (<Fragment>
                            {this.props.buzz.buzzList.length > 0 && this.props.buzz.buzzList.slice(0, this.state.limit * this.state.skip).map((post) => {
                                return (
                                    <PostTemplateComponent
                                        post={post}
                                        key={post._id}
                                        happyClickHandle={this.happyClickHandle}
                                        angryClickHandle={this.angryClickHandle}
                                        sadClickHandle={this.sadClickHandle}
                                        user={this.props.user}
                                        updateBuzzContent={this.props.updateBuzzContent}
                                        reportBuzz={this.props.reportBuzz}
                                    />
                                )
                            })}
                            {this.props.buzz.buzzStatus === STATUS.STARTED &&
                            <LoaderView loadingText={'Loading Posts'}/>}
                        </Fragment>
                    )
                }
            </div>
        )
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScrollEvent);
    }
}

export default BuzzPosts;