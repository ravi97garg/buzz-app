import React from "react";
import {Link} from "react-router-dom";
import {getToken} from "../../utilities";

export default class NotAuthenticatedComponent extends React.Component{

    goBack = () => {
        this.props.history.push('/dashboard');
    };

    componentDidMount() {
        if(getToken()){
            this.props.history.push('/dashboard');
        }
    }

    render(){
        return(
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>Oops!</h1>
                        <h2>You are not authenticated</h2>
                    </div>
                    <Link to={'/login'}>Login Again</Link>
                </div>
            </div>
        )
    }

}