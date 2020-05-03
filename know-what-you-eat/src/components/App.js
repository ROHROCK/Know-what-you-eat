import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import AuthenticatedComponent from "./AuthenicatedComponent";
import Dashboard from "./Dashboard";
import Register from "./Register";
import History from "./History";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <AuthenticatedComponent>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/history' component={History} />
          </AuthenticatedComponent>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
