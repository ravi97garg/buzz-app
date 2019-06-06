import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import AppRouterComponent from "./components/appRouter";

class App extends React.Component{

  render() {
    return (
      <div>

        <HeaderComponent/>
        <Router>
          <Route path={'/'} component={AppRouterComponent}/>
        </Router>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
