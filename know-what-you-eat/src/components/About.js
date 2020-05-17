import React, { Component } from "react";
import NavBar from "./HomeNavbar";
import "./css/about.css";
import ReactImage from "./css/assests/reactJS.png";
import FlaskImage from "./css/assests/flask.png";
import MongoImage from "./css/assests/mongo.png";
import PythonImage from "./css/assests/python.png";
import TensorImage from "./css/assests/tensorflow.png";

class About extends Component {
  render() {
    return (
      <div class="AboutMain">
        <NavBar userLogginStatus={"Login"} />
        <h1>About Us and The Project</h1>
        <p>
          We are enthusiastic FINAL YEAR programmers from Computer
          Department,DYPCOE.
        </p>
        <p>
          Talking about the project -- <br></br>
          The idea proposed was to make a web/android application which will be
          able to calculate the calorie value of food when provided images of
          the food. The user will give images as input and a output of calorie
          values will be generated.<br></br>
          This is done with motto that most of the people in India are becoming
          aware about fitness but it is difficult to keep a track of nutrients
          they are consuming.<br></br>
        </p>
        <h2>Technology used</h2>
        <div class="Technology">
          <div class="Row1">
            <img src={FlaskImage} alt="" />
            <img src={ReactImage} alt="" />
            <img src={MongoImage} alt="" />
          </div>
          <div class="Row2">
            <img src={PythonImage} alt="" />
            <img src={TensorImage} alt="" />
          </div>
        </div>
        <div>
            <h3>Group Members</h3>
            <ul>
                <li>Aditya Kulkarni</li>
                <li>Rohit Agharkar</li>
                <li>Yogesh Dollin</li>
                <li>Shubham Thorat</li>
            </ul>
        </div>
      </div>
    );
  }
}

export default About;
