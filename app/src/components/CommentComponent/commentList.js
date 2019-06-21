import React from 'react';
import {initBuzzAction, loadMoreBuzzAction} from "../../actions/buzz.action";
import {reactionAction} from "../../actions/reaction.action";
import {connect} from "react-redux";
import CommentRowComponent from "./commentRow";

class CommentListComponent extends React.Component {

    render() {
        return (
            <div>
                {this.props.post.comments.map((comment) => {
                    return (
                        <CommentRowComponent profileImage={comment.commentBy.profileImage}
                                             comment={comment.comment}
                                             commentedOn={comment.commentedOn}
                                             commentBy={comment.commentBy.name}
                                             key={comment._id}
                        />
                    )
                })}

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        buzz: state.buzz.buzzList
    }
};

const mapDispatchToProps = {
    initBuzzAction,
    loadMoreBuzzAction,
    reactionAction
};

const CommentListConnect = connect(mapStateToProps, mapDispatchToProps)(CommentListComponent);

export default CommentListConnect;