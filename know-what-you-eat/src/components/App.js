import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import AuthenticatedComponent from "./AuthenicatedComponent";
import Dashboard from "./Dashboard";
import Register from "./Register";
import History from "./History";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
    this.userStatusHandler = this.userStatusHandler.bind(this);
  }

  userStatusHandler = () => {
    console.log("User handler is called ");
    // set the user login status
    if (localStorage.getItem("jwt") != null) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Redirect exact from="/" to="Dashboard" /> */}
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
