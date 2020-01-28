import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import Home from './Home';
import Login from './Login'
import AuthenticatedComponent from './AuthenicatedComponent';
import ImageLoader from './ImageLoader';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path='/' exact component={Home} />
        <AuthenticatedComponent>
          <Route path="/Protected" component={ImageLoader} />
        </AuthenticatedComponent>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
