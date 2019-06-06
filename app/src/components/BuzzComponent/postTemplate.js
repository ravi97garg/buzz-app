import React from 'react';

export default class PostTemplateComponent extends React.Component{

    render(){
        return (
            <div>
                <div>
                    <img alt={'postedBy'} src={this.props.profileImage}/>
                </div>
                <span>{this.props.title}</span>
                <span>{this.props.content}</span>
            </div>
        )
    }

}