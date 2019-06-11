import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import BuzzComponent from "./BuzzComponent";
import LoginComponent from "./login";
import ResolveComponent from "./resolve";
import ComplaintsComponent from "./ComplaintsComponent";
import NavLinkComponent from "./navLinks";
import {connect} from "react-redux";
import {createUser} from "../actions/user.action";
import HeaderComponent from "./header";
import FooterComponent from "./footer";
const authenticateToken = require('../services/authenticate').authenticateToken;

class AppRouterComponent extends React.Component {
    constructor(props){
        super(props);
        if(!localStorage.getItem("Token") && props.location.pathname === '/'){
            props.history.push('/login');
        } else if(props.location.pathname === '/') {
            authenticateToken(localStorage.getItem("Token"))
                .then((res) => {
                    if(res.data){
                        props.createUser();
                        props.history.push('/dashboard');
                    } else {
                        props.history.push('/login');
                    }
                    // return !!res.data;
                })
                .catch((err)=>{
                    console.log(`error while authenticating: ${err}`);
                });
        }
    }


    
    render() {
        return (
            <Switch>
                <Route path='/token' render={(props)=><TokenComponent {...props} createUser={this.props.createUser}/>}/>
                <PrivateRoute path={"/dashboard"} isAuth={this.isAuthenticated} component={BuzzComponent}/>
                <PrivateRoute path={"/complaints"} isAuth={this.isAuthenticated} component={ComplaintsComponent}/>
                <PrivateRoute path={"/resolve"} isAuth={this.isAuthenticated} component={ResolveComponent}/>
                <Route path={"/login"} component={LoginComponent}/>
            </Switch>
        )
    }
}

const TokenComponent = (props) => {
    const token = props.location.search.split('?q=')[1];
    localStorage.setItem('Token', token);
    props.createUser(token);
    props.history.push('/dashboard');
    return <React.Fragment/>
};

const PrivateRoute = ({component: Component, ...rest}) => {
    if (localStorage.getItem('Token')) {
        return <Route {...rest} render={(props) => (
            <div>
            <HeaderComponent/>
            <div className={'actual-body'}>
                <div className={'container'}>
                    <NavLinkComponent/>
                    <Component {...props}/>
                </div>
            </div>
                <FooterComponent/>
            </div>)}/>
    } else {
        console.log("Invalid login");
        return <Route {...rest} render={(props) => <Redirect {...props} to={'/login'}/>
        }/>
    }
};

const mapStateToProps = (state) => {
    return {
    user: state.user }
};

const mapDispatchToProps = {
    createUser
};

const AppRouter = connect(mapStateToProps, mapDispatchToProps)(AppRouterComponent);

export default AppRouter;