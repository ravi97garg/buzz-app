import React, {Component} from 'react';
import BuzzFormComponent from "./buzzForm";
import BuzzPosts from "./buzzPosts";


export default class BuzzComponent extends Component {


    render(){
        return (
            <div className={'buzz'}>
                <BuzzFormComponent/>
                <BuzzPosts/>
            </div>
        )
    }
}
