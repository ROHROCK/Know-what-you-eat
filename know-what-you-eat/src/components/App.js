import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Login from './Login';
import AuthenticatedComponent from './AuthenicatedComponent';
// import NavbarComponent from './NavbarComponent';
import Dashboard from './Dashboard';
import Register from './Register';
import Home from './home';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status:false
    };
    this.userStatusHandler = this.userStatusHandler.bind(this);
  }
  
  userStatusHandler = () => {
    console.log("User handler is called ");
    // set the user login status
    if(localStorage.getItem("jwt") != null){
      this.setState({status:true});
    }
    else{
      this.setState({status:false});
      }
  }
  
  render() {
    // const LoginPage = (props) =>{
    //   return(<Login userHandler={props.match.params.userStatusHandler} {...props} />)
    // }
    return (
       <BrowserRouter>
        <Switch>
        {/* <Redirect exact from="/" to="Dashboard" /> */}
        <Route path="/login" component={Login} />
        <Route exact path="/register" component={Register} /> 
          <AuthenticatedComponent>
            <Route path="/Dashboard" component={Dashboard} />
          </AuthenticatedComponent>
        </Switch> 
      </BrowserRouter>
    );
  }
}

export default App;