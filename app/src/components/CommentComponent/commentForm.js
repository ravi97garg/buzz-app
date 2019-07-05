import React from 'react';
import {postCommentService} from "../../services/comment.service";

class CommentFormComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            toastClasses: 'snackbar '
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    showToast = () => {
        this.setState({
            toastClasses: this.state.toastClasses + 'show-toast'
        });

        setTimeout(() => {
            this.setState({
                toastClasses: 'snackbar '
            }, this.props.setBuzzStatusDefaultAction());
        }, 3000)
    };

    handleSubmit = (e) => {
        e.preventDefault();
        postCommentService(this.props.buzzId, this.state.comment).then((res) => {
            this.props.createCommentAction(res.comment);
            this.setState({
                comment: ''
            })
        }).catch(() => {
            this.showToast()
        });

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
                <div className={this.state.toastClasses}>Oops! An Error Occured</div>
            </div>
        )
    }
}

export default CommentFormComponent;