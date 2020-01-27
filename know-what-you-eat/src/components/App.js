import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Router} from 'react-router-dom';
import Home from './Home';
import AuthenticatedComponent from './AuthenicatedComponent';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/Auth" component={AuthenticatedComponent} />
        <Route path='/' exact component={Home} />
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
