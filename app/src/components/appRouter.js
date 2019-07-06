import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import BuzzComponent from "./BuzzComponent";
import LoginComponent from "./Login";
import ResolveComponent from "./ResolveComponent";
import ComplaintsComponent from "./ComplaintsComponent";
import NavLinkComponent from "./NavLinkComponent";
import {connect} from "react-redux";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import PageNotFoundComponent from "./PageNotFoundComponent";
import {createUser, userLoginFailed} from "../services/user.service";
import {STATUS} from "../constants";
import LoaderComponent from "./Loader";


class AppRouterComponent extends React.Component {

    render() {
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
        if (!localStorage.getItem("Token")) {
            this.props.history.push('/login');
        } else {
            console.log('mount from router');
            this.props.createUser();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.user.currentStatus === STATUS.FAILED) {
        } else if (this.props.user.currentStatus === STATUS.SUCCESS) {
            if (this.props.location.pathname === '/' || this.props.location.pathname === '/token') {
                this.props.history.push('/dashboard');
            }
        }
    }
}

const TokenComponent = (props) => {
    const token = props.location.search.split('?q=')[1];
    localStorage.setItem('Token', token);
    props.history.push('/dashboard');
    return <React.Fragment/>
};

const PrivateRoute = ({component: Component, path, userStatus, ...rest}) => {
    if (localStorage.getItem('Token') && userStatus === STATUS.SUCCESS) {
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
        if (userStatus === STATUS.DEFAULT || userStatus === STATUS.STARTED) {
            return <Route path={path} {...rest} render={() => <LoaderComponent/>}/>
        } else {
            if (userStatus === STATUS.SUCCESS) {
                rest.history.push('/dashboard');
                return <Route {...rest} render={() => <Fragment/>}/>
            } else if (userStatus === STATUS.FAILED){
                localStorage.clear();
                rest.history && rest.history.push('/login');
                return <Route {...rest} render={() => <Fragment/>}/>
            } else {
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
            }
        }
    } else {
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