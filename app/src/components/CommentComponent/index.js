import React from 'react';
import CommentFormComponent from "./commentForm";
import CommentListComponent from "./commentList";

class CommentComponent extends React.Component {

    render() {
        return (
            <div className={this.props.className}>
                <CommentFormComponent buzzId={this.props.buzzId} post={this.props.post}/>
                <CommentListComponent buzzId={this.props.buzzId} post={this.props.post}/>
            </div>
        )
    }

}

export default CommentComponent;