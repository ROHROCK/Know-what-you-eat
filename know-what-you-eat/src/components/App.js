import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AuthenticatedComponent from './AuthenicatedComponent';
import Navbar from './Navbar';
// import Dashboard from './Dashboard';
import ImageLoader from './ImageLoader';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
       {/* <Navbar /> */}
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/" component={Home}/> */}
          <AuthenticatedComponent>
            <Route path="/Dashboard" component={Dashboard} />
          </AuthenticatedComponent>
        </Switch> 
      </BrowserRouter>
    );
  }
}

export default App;