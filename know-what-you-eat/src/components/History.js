import React, { Component } from "react";
import Axios from "axios";
import NavbarComponent from "./NavbarComponent";
import "./css/history.css";
import fire from "./css/assests/fire.png";
import {Bar,Pie, Line} from 'react-chartjs-2';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      chartData:{
        labels:['Monday','Tuesday','Wensday','Thursday','Friday'],
        datasets:[{
          label:'Calorie',
          data:[
            250,
            100,
            300,
            1000,
            230
          ],
          backgroundColor:[
            'rgba(255,99,132,0.6)',
            'rgba(54,162,235,0.6)',
            'rgba(255,206,86,0.6)',
            'rgba(75,192,192,0.6)',
            'rgba(153,102,255,0.6)',
            'rgba(255,159,64,0.6)',
            'rgba(255,99,132,0.6)'
          ]
        }]
      }
    };
    this.fetchHistory = this.fetchHistory.bind(this);
  }
  componentDidMount() {
    // console.log("Component is mounted !");
    this.fetchHistory();
  }
  fetchHistory = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      this.props.history.push("/login");
    }
    Axios.get("/getHistory", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      option: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => {
        this.setState({
          data: result.data[0][0].history,
        });
        // console.log(this.state.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };
  render() {
    var printOut = "";
    if (this.state.data !== []) {
      printOut = this.state.data.map(function (data, id) {
        return (
          <div id='list'>
            <li key={id}>
              <div>
                Food: {data.frontFruitName}
                <br></br>
                Time Taken: {data.time}
                <br></br>
                Calorie: {data.calorie}
              </div>
            </li>
          </div>
        );
      });
    }
    return (
      <div>
        <NavbarComponent userLogginStatus={"Logout"} />
        <div id='main'>
          <div id='picker'>
            <h3>Today</h3>
          </div>
          <div id='displayData'>
              <div id='totalCalorie' 
                >
                <div id="first-row" style={{
                display: "flex",
                alignItems:"center"
              }}>
                  <img
                    style={{ height: "30px", opacity: "0.7"}}
                    src={fire}
                    alt='fire icon'
                  />
                  <p id="calorieText">205</p>
                  <p id='calText'>cal</p>
                </div>
                <div id="second-row" style={{ color: "gray", alignItems: "start" }}>
                  CALORIE
                </div>
            </div>
            <div id='data'>
              <div style={{opacity:'0.6'}}>
                Logged Meals
              </div>
              <div id="food-list" style={{backgroundColor:"#bfbfbf"}}>
                {/* Front Food: Apple
                <br></br>
                Calorie: 100 */}
                <ol>{printOut}</ol>
              </div>
              {/* <ol>{printOut}</ol> */}
            </div>
          </div>
          <div id='displayChart'>
            <div>
              <Bar
              data={this.state.chartData}
              options={{maintainAspectRatio: true}} />
            </div>
          </div>
        </div>
        {/* <div
          id='showData'
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className='list-type1'>
            <ol>{printOut}</ol>
          </div>
        </div> */}
      </div>
    );
  }
}

export default History;
