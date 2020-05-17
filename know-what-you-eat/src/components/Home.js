import React, { Component } from "react";
import NavBar from "./NavbarComponent";
import "./css/landing.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="LandingContainer">
        <NavBar userLogginStatus={"Login"} />
        <div id="Main">
          <img id="background" alt="">
          </img>
          <div id="MainText">
            We built an application to help you track calorie with ease.
          </div>
        </div>
        <div id="BottomBar">
          <img id="historyButton" alt=""></img>
          <div id="trackContent">Track your History</div>
        </div>
      </div>
    );
  }
}
export default Home;
