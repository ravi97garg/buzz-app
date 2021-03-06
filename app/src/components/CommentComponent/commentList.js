import React from 'react';
import CommentRowComponent from "./commentRow";

class CommentListComponent extends React.Component {

    render() {
        return (
            <div>
                {this.props.post.comments.map((comment) => {
                    return (
                        <CommentRowComponent profileImage={comment.author.profileImage}
                                             comment={comment.comment}
                                             commentedOn={comment.commentedOn}
                                             commentBy={comment.author.name}
                                             key={comment._id}
                        />
                    )
                })}

            </div>
        )
    }

}

export default CommentListComponent;