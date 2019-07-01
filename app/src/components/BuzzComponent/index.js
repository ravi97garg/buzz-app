import React, {Component} from 'react';
import BuzzFormComponent from "./BuzzForm";
import BuzzPosts from "./BuzzPosts";
import {connect} from "react-redux";
import {
    createBuzzService,
    getInitialBuzzService,
    getMoreBuzzService, reportBuzz,
    setBuzzStatusDefaultAction,
    updateBuzzContent
} from "../../services/buzz.service";
import {reactionService} from "../../services/reaction.service";

class BuzzComponent extends Component {

    render() {
        const {
            buzz,
            user,
            createBuzzService,
            getMoreBuzzService,
            reactionService,
            setBuzzStatusDefaultAction,
            getInitialBuzzService,
            updateBuzzContent,
            reportBuzz
        } = this.props;
        return (
            <div className={'buzz'}>
                <BuzzFormComponent
                    createBuzzService={createBuzzService}
                    buzz={buzz}
                />
                <BuzzPosts
                    buzz={buzz}
                    user={user}
                    getMoreBuzzService={getMoreBuzzService}
                    reactionService={reactionService}
                    setBuzzStatusDefaultAction={setBuzzStatusDefaultAction}
                    getInitialBuzzService={getInitialBuzzService}
                    updateBuzzContent={updateBuzzContent}
                    reportBuzz={reportBuzz}
                />
            </div>
        )
    }

    componentWillUnmount() {
        this.props.setBuzzStatusDefaultAction();
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
    reportBuzz,
    createBuzzService
};

export default connect(mapStateToProps, mapDispatchToProps)(BuzzComponent);