import React from 'react';

export default class LoginComponent extends React.Component {

    componentDidMount() {
        if(localStorage.getItem('Token')){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                <a href='http://localhost:8080/auth/google'>
                    <button>LOGIN WITH GOOGLE</button>
                </a>
            </div>
        )
    }
}