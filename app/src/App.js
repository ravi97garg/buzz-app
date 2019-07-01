import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import AppRouterComponent from "./components/appRouter";
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

}
const mapStateToProps = (state) => {
    return {
        user: state.user }
};

const AppConnect = connect(mapStateToProps, undefined)(App);

export default AppConnect;
