import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import Axios from "axios";

class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.logoutFunction = this.logoutFunction.bind(this);
    this.redirectRegister = this.redirectRegister.bind(this);
    this.redirectLogin = this.redirectLogin.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderRegisterButton = this.renderRegisterButton.bind(this);
  }

  logoutFunction = () => {
    const token = localStorage.getItem("jwt");
    // console.log(token);
    const config = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        Authorization: `bearer ${token}`,
      },
      option: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.post("http://test.beserver.cloudns.cl/logout", config)
      .then((response) => {
        console.log("Response", response);
        if (response.status === 200) {
          console.log("The token is successfully uploaded");
        }
      })
      .catch((error) => {
        console.log("Error uploading jwt token for blacklisting");
      });
    localStorage.clear("token");
    // this.props.userHandler();
    this.props.history.push("/login");
  };
  // componentWillReceiveProps(){
  //   this.props.userHandler();
  // }
  redirectRegister = () => {
    console.log("Redircting the register");
    this.props.history.push("/register");
  };

  redirectLogin = () => {
    console.log("Redirecting to login");
    this.props.history.push("/login");
  };
  renderRegisterButton = () => {
    return (
      <Button
        className="pull-right"
        id="actionButton"
        onClick={this.redirectRegister}
      >
        Register
      </Button>
    );
  };
  renderButton = (userLogginStatus) => {
    switch (userLogginStatus) {
      case "Register":
        return (
          <Button
            className="pull-right"
            id="actionButton"
            onClick={this.redirectRegister}
          >
            Register
          </Button>
        );

      case "Login":
        return (
          <Button
            className="pull-right"
            id="actionButton"
            onClick={this.redirectLogin}
          >
            Login
          </Button>
        );

      case "Logout":
        return (
          <div>
            <Button
              className="pull-right"
              id="actionButton"
              onClick={this.logoutFunction}
            >
              Logout
            </Button>
            <Button
              className="pull-right"
              id="actionButton"
              onClick={this.redirectHistory}
            >
              History
            </Button>
          </div>
        );
      default:
        return;
    }
  };
  redirectHistory = () => {
    console.log("Redircting the history");
    this.props.history.push("/history");
  };
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/Dashboard">Know what you eat</Navbar.Brand>
        {this.renderButton(this.props.userLogginStatus)}
        {<li></li>}
        {this.renderRegisterButton()}
      </Navbar>
    );
  }
}
export default withRouter(NavbarComponent);
