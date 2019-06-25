import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import BuzzComponent from "./BuzzComponent";
import LoginComponent from "./login";
import ResolveComponent from "./ResolveComponent";
import ComplaintsComponent from "./ComplaintsComponent";
import NavLinkComponent from "./navLinks";
import {connect} from "react-redux";
import {createUser} from "../actions/user.action";
import HeaderComponent from "./header";
import FooterComponent from "./footer";
import PageNotFoundComponent from "./pageNotFound";

const {authenticateToken} = require('../services/authenticate');

class AppRouterComponent extends React.Component {
    constructor(props) {
        console.log('inside app router construct')
        super(props);
        console.log(`props: ${JSON.stringify(props)}`);

    }


    render() {

        console.log('inside app router render')
        return (
            <Switch>
                <Route exact path='/token'
                       render={(props) => <TokenComponent {...props} createUser={this.props.createUser}/>}/>
                <PrivateRoute exact path={"/dashboard"} component={BuzzComponent}/>
                <PrivateRoute exact path={"/complaints"} component={ComplaintsComponent}/>
                <PrivateRoute exact path={"/resolve"} component={ResolveComponent}/>
                <Route exact path={"/login"} component={LoginComponent}/>
                <Route component={PageNotFoundComponent}/>
            </Switch>
        )
    }

    componentDidMount() {
        console.log('inside app router did mount')
        if (!localStorage.getItem("Token")) {
            this.props.history.push('/login');
        } else {
            console.log('runned it');
            authenticateToken(localStorage.getItem("Token"))
                .then((res) => {
                    if (res) {
                        console.log('runned it again');
                        this.props.createUser(res);
                        if (this.props.history.location.pathname !== '/') {
                            this.props.history.push(this.props.history.location.pathname);
                        } else {
                            this.props.history.push('/dashboard')
                        }

                    } else {
                        this.props.history.push('/login');
                    }
                    // return !!res.data;
                })
                .catch((err) => {
                    console.log(`error while authenticating: ${err}`);
                    this.props.history.push('/login');
                });
        }
    }
}

const TokenComponent = (props) => {
    const token = props.location.search.split('?q=')[1];
    localStorage.setItem('Token', token);
    authenticateToken(token)
        .then((user) => {
        props.createUser(user);
        props.history.push('/dashboard')
    })
        .catch((err) => {
            props.history.push('/login')
        });
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
        user: state.user
    }
};

const mapDispatchToProps = {
    createUser
};

const AppRouter = connect(mapStateToProps, mapDispatchToProps)(AppRouterComponent);

export default AppRouter;