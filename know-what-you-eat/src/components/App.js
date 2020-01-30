import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AuthenticatedComponent from './AuthenicatedComponent';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ImageLoader from "./ImageLoader";

class App extends Component {
  render() {
    return (
      <Route path="/" component={ImageLoader} />
      //  <BrowserRouter>
      // <Route path="/" component={ImageLoader} />
      //  <Navbar />
      // <Switch>
      //   <Route path="/Login" component={Login} />
      //   <Route path='/' exact component={Home} />
      //   <AuthenticatedComponent>
      //     <Route path="/Protected" component={Dashboard} />
      //   </AuthenticatedComponent>
      // </Switch> 
      // </BrowserRouter>
    );
  }
}

export default App;
