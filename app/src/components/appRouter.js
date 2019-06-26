import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import BuzzComponent from "./BuzzComponent";
import LoginComponent from "./login";
import ResolveComponent from "./ResolveComponent";
import ComplaintsComponent from "./ComplaintsComponent";
import NavLinkComponent from "./navLinks";
import {connect} from "react-redux";
import HeaderComponent from "./header";
import FooterComponent from "./footer";
import PageNotFoundComponent from "./pageNotFound";
import {createUser, userLoginFailed} from "../services/user.service";
import {STATUS} from "../constants";
import LoaderComponent from "./Loader";


class AppRouterComponent extends React.Component {

    render() {
        console.log('inside app router render', this.props.user.currentStatus);
        return (
            <Fragment>
                {(this.props.user.currentStatus === STATUS.STARTED) ?
                    <LoaderComponent/> :
                    <Switch>
                        <Route exact path='/token'
                               render={(props) => <TokenComponent {...props}
                                                                  createUser={this.props.createUser}
                                                                  userStatus={this.props.user.currentStatus}
                               />}
                        />
                        <PrivateRoute exact
                                      path={"/dashboard"}
                                      component={BuzzComponent}
                                      userStatus={this.props.user.currentStatus}
                        />
                        <PrivateRoute exact
                                      path={"/complaints"}
                                      component={ComplaintsComponent}
                                      userStatus={this.props.user.currentStatus}
                        />
                        <PrivateRoute exact
                                      path={"/resolve"}
                                      component={ResolveComponent}
                                      userStatus={this.props.user.currentStatus}
                        />
                        <Route exact
                               path={"/login"}
                               component={LoginComponent}
                        />
                        <Route component={PageNotFoundComponent}/>
                    </Switch>}
            </Fragment>
        )
    }

    componentDidMount() {
        console.log('inside app router did mount');
        if (!localStorage.getItem("Token")) {
            // this.props.userLoginFailed();
            this.props.history.push('/login');
        } else {
            this.props.createUser();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.user.currentStatus === STATUS.FAILED) {
            console.log('reached up here and moving to login');
        } else if (this.props.user.currentStatus === STATUS.SUCCESS) {
            console.log(`hello ${JSON.stringify(this.props)}`);
            if (this.props.location.pathname === '/' || this.props.location.pathname === '/token') {
                this.props.history.push('/dashboard');
            }
        }
    }
}

const TokenComponent = (props) => {
    console.log('man=====', props.userStatus);
    const token = props.location.search.split('?q=')[1];
    localStorage.setItem('Token', token);
    props.history.push('/dashboard');
    return <React.Fragment/>
};

const PrivateRoute = ({component: Component, path, userStatus, ...rest}) => {
    if (localStorage.getItem('Token') && userStatus === STATUS.SUCCESS) {
        console.log(`hello location`);
        return <Route {...rest} path={path} render={(props) => (
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
    } else if (localStorage.getItem('Token')) {
        console.log('hey');
        // rest.createUser();
        if (userStatus === STATUS.DEFAULT || userStatus === STATUS.STARTED) {
            console.log('1', Component, path, userStatus);
            return <Route path={path} {...rest} render={() => <LoaderComponent/>}/>
        } else {
            if (userStatus === STATUS.SUCCESS) {
                console.log('2');
                rest.history.push('/dashboard');
                return <Route {...rest} render={() => <Fragment/>}/>
            } else {
                console.log('3');
                rest.history.push('/login');
                return <Route {...rest} render={() => <Fragment/>}/>
            }
        }
    } else {
        console.log("Invalid login");
        return <Route {...rest} path={path} render={(props) => <Redirect {...props} to={'/login'}/>
        }/>
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = {
    createUser,
    userLoginFailed
};

const AppRouter = connect(mapStateToProps, mapDispatchToProps)(AppRouterComponent);

export default AppRouter;