import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AppRouterComponent from "./components/appRouter";
import {createUser} from "./actions/user.action";
import {connect} from "react-redux";

class App extends React.Component{

  render() {
    return (
      <div>

        <Router>
          <Route component={AppRouterComponent}/>
        </Router>
      </div>
    );
  }

  componentDidMount() {
      if(localStorage.getItem('Token')){
          this.props.createUser(localStorage.getItem('Token'))
      }
  }
}
const mapStateToProps = (state) => {
    return {
        user: state.user }
};

const mapDispatchToProps = {
    createUser
};

const AppConnect = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnect;
