import React from 'react';
import {postCommentService} from "../../services/comment.service";
import {connect} from "react-redux";
import {createCommentAction} from "../../actions/comment.action";

class CommentFormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        postCommentService(this.props.buzzId, this.state.comment).then((res) => {
            console.log(res.comment);
            this.props.createCommentAction(res.comment);
        }).catch((err) => {
            console.error(err);
        });
        this.setState({
            comment: ''
        })
    };

    render() {
        const {comment} = this.state;
        return (
            <div className={'comment-form clearfix'}>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        name={'comment'}
                        value={comment}
                        onChange={this.handleChange}
                        placeholder={'Add Comment...'}
                    />
                    <input type={'submit'} value={'POST'}/>
                </form>
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

const CommentFormConnect = connect(mapStateToProps, mapDispatchToProps)(CommentFormComponent);

export default CommentFormConnect;