import React, { Component } from "react";
import NavBar from "./HomeNavbar";
import "./css/home.css";
// import backgroundImage from "./css/assests/landingBackground.jpg";
import historyImageHome from "./css/assests/list.png";
import calculatorImageHome from "./css/assests/calculate.png";
import aboutImageHome from "./css/assests/aboutUs.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.renderTrackHistoryButton = this.renderTrackHistoryButton.bind(this);
    this.renderCalculateCalorieButton = this.renderCalculateCalorieButton.bind(this);
    this.renderAboutUsButton = this.renderAboutUsButton.bind(this);
  }
  renderCalculateCalorieButton = () => {
    console.log("Redircting the dashboard");
    this.props.history.push("/dashboard");
  };
  renderTrackHistoryButton = () => {
    console.log("Redircting the history");
    this.props.history.push("/history");
  };
  renderAboutUsButton = () => {
    console.log("Redircting the aboutUs");
    this.props.history.push("/about");
  };
  render() {
    return (
      <div>
        <NavBar userLogginStatus={"Login"} />
        <div class="HomeContainer">
          <div class="MainPart">
            <p class="MainText">
              We built an application to help you track calorie with ease.
            </p>
          </div>
          <div class="BottomPart">
            <div class="HistoryHome">
              <img
                src={historyImageHome}
                class="historyButton"
                alt="history-img"
                onClick={this.renderTrackHistoryButton}
              >
                
              </img>
              <div class="TrackContent">Track your History</div>
            </div>
            <div class="CaloriCalHome">
              <img
                src={calculatorImageHome}
                class="calculateCalButton"
                alt="history-img"
                onClick={this.renderCalculateCalorieButton}
              >
                
              </img>
              <div class="CalorieContent">Calculate Calories</div>
            </div>
            <div class="AboutHome">
              <img
                src={aboutImageHome}
                class="AboutHomeButton"
                alt="aboutHome-img"
                onClick={this.renderAboutUsButton}
              >
                
              </img>
              <div class="AboutContent">About Us</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
