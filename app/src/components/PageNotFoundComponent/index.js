import React from "react";
import {Link} from "react-router-dom";

export default class PageNotFoundComponent extends React.Component{

    goBack = () => {
        this.props.history.push('/dashboard');
        // this.props.history.goBack();
    };

    render(){
        return(
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>Oops!</h1>
                        <h2>404 - The Page can't be found</h2>
                    </div>
                    <Link to={'/dashboard'}>Go To Homepage</Link>
                </div>
            </div>
        )
    }

}