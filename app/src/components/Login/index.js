import React from 'react';

import {BASE_URL} from "../../config";

export default class LoginComponent extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('Token')) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className={'loginBg'}>
                <div className={'loginCard'}>
                    <div className={'logo-wrap'}>
                        <img
                            src={'https://res.cloudinary.com/dnuq1lgqs/image/upload/v1560507335/aii5lyke0nivdkwvbgzh.png'}/>
                    </div>
                    <span className={'card-title'}>TTN BUZZ</span>
                    <div className={'login-btn-wrapper'}>
                        <a href={`${BASE_URL}/auth/google`}>
                            <button>LOGIN WITH GOOGLE</button>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}