import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import BuzzComponent from './components/dashboard';
import HeaderComponent from './components/header';
import ComplaintsComponent from './components/complaints';
import FooterComponent from './components/footer';
import LoginComponent from './components/login';


class App extends React.Component{
  state = {
    auth: false
  };

  render() {
    return (
      <div>
        <HeaderComponent />
        <Router>
          <Switch>
            <Route path='/dashboard' component={BuzzComponent} />
            <Route path='/complaints' component={ComplaintsComponent} />
            <Route path='/login' component={LoginComponent} />
            <Route path='/' render={(props) => <PrivateRoute {...props} isLogin={this.state.auth}/>}/>
            {/* <PrivateRoute isLogin={this.state.auth}/> */}
          </Switch>
        </Router>
        <FooterComponent />
      </div>
    );
  }
}

function PrivateRoute(props){
  if(props.isLogin){
    return <BuzzComponent {...props} />
  } else {
    return <Redirect {...props} to={'/login'} />
  }
}


export default App;
