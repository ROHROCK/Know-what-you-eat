import React, { Component } from "react";
import Axios from "axios";
import NavbarComponent from "./NavbarComponent";
import "./css/history.css";
import fire from "./css/assests/fire.png";
import { Bar } from "react-chartjs-2";
import noDataImg from './css/assests/noDataFound.png';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      dataIsEmpty: undefined,
      chartData: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
    this.fetchHistory = this.fetchHistory.bind(this);
    this.parseTodayCalorie = this.parseTodayCalorie.bind(this);
    this.displayEmptyDataScreen = this.displayEmptyDataScreen.bind(this);
    // this.HistoryNotEmpty = this.HistoryNotEmpty.bind(this);
  }
  parseTodayCalorie = () => {
    if (this.state.data.length == 0) {
      console.log("Empty data for today !");
      this.displayEmptyDataScreen();
    }
  };
  displayEmptyDataScreen = () => {
    this.setState({
      dataIsEmpty: false,
    });
  };
  componentDidMount() {
    // console.log("Component is mounted !");
    // this.fetchHistory();
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
    var layout = "";
    if (this.state.data.length !== 0) {
      printOut = this.state.data.map(function (data, id) {
        return (
          <div key={id} id='list'>
            <li>
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
    } else {
      console.log("No history found at all");
      layout = <img styles={{height:"100vh",width:"100vh"}} src={noDataImg} alt="No data found"/>
    }
    return (
      <div>
        <NavbarComponent userLogginStatus={"Logout"} />
        {layout}
        <div id='main'>
          <div id='picker'>
            <h3>Today</h3>
          </div>
          <div id='displayData'>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              <div id='totalCalorie'>
                <div
                  id='first-row'
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ height: "30px", opacity: "0.7" }}
                    src={fire}
                    alt='fire icon'
                  />
                  <p id='calorieText'>205</p>
                  <p id='calText'>cal</p>
                </div>
                <div
                  id='second-row'
                  style={{ color: "gray", alignItems: "start" }}
                >
                  CALORIE
                </div>
              </div>
              <div id='data'>
                <div style={{ opacity: "0.6" }}>Logged Meals</div>
                <div id='food-list' style={{ backgroundColor: "#bfbfbf" }}>
                  <ol>{ printOut }</ol>
                </div>
              </div>
            </div>
            <div id='displayChart'>
              <Bar
                data={this.state.chartData}
                options={{ maintainAspectRatio: true }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
