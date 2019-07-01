import React from 'react';
import CommentFormComponent from "./commentForm";
import CommentListComponent from "./commentList";
import {createCommentAction} from "../../actions/comment.action";
import {connect} from "react-redux";

class CommentComponent extends React.Component {

    render() {
        return (
            <div className={this.props.className}>
                <CommentFormComponent
                    buzzId={this.props.buzzId}
                    post={this.props.post}
                    createCommentAction={this.props.createCommentAction}
                />
                <CommentListComponent
                    buzzId={this.props.buzzId}
                    post={this.props.post}
                />
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
    createCommentAction
};

const CommentComponentConnect = connect(mapStateToProps, mapDispatchToProps)(CommentComponent);

export default CommentComponentConnect;