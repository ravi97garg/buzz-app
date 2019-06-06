import React, {Component} from 'react';

export default class HeaderComponent extends Component {
    render(){
        return (
            <header className={'clearfix'}>
                <div className={'container'}>
                    TTN Buzz
                    <button className={'header-btn'}>{localStorage.getItem('Token')?'LOGOUT':'LOGIN'}</button>
                </div>
            </header>
        )
    }
}