import React, { Component } from "react";
import Axios from "axios";
import NavbarComponent from "./NavbarComponent";
import "./css/history.css";
import fire from "./css/assests/fire.png";
import { Bar } from "react-chartjs-2";
import noDataImg from "./css/assests/noDataFound.png";
import DatePicker from "react-date-picker";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
var format = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Number of Calorie",
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
      borderWidth: 2,
    },
  ],
};
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      dataIsEmpty: undefined,
      totalCalorie: 0,
      date: new Date(),
      range: [new Date(), new Date()],
      focused: true,
      chartData: format,
      options: {
        scales: {
          xAxes: [
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
    this.onDateChange = this.onDateChange.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.fetchRangeHistory = this.fetchRangeHistory.bind(this);
  }
  onRangeChange = (date) => {
    this.setState({ range: date });
    console.log("Range of date :", date);
    this.fetchRangeHistory();
  };

  onDateChange = (date) => {
    console.log("User selected:", date.getDate());
    this.setState({ date: date });
    this.fetchHistory(date);
  };

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
    this.fetchHistory(this.state.date);
  }

  fetchRangeHistory = () => {
    var yearS = this.state.range[0].getFullYear();
    var monthS = this.state.range[0].getMonth() + 1;
    var dayS = this.state.range[0].getDate();

    var yearE = this.state.range[1].getFullYear();
    var monthE = this.state.range[1].getMonth() + 1;
    var dayE = this.state.range[1].getDate();

    console.log("Start range", yearS, monthS, dayS);
    console.log("End range", yearE, monthE, dayE);

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      this.props.history.push("/login");
    }
    Axios.post("/getRangeHistory", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      option: {
        "Access-Control-Allow-Origin": "*",
      },
      yearStart: yearS,
      monthStart: monthS,
      dayStart: dayS,
      yearEnd: yearE,
      monthEnd: monthE,
      dayEnd: dayE,
    })
      .then((result) => {
        console.log("Range of result:", result.data);
        format.labels = result.data.label;
        format.datasets[0].data = result.data.data;
        this.setState({
          chartData: format,
        });
      })
      .catch((err) => {
        console.log("Error in fetching range date", err);
      });
  };
  fetchHistory = (d) => {
    // var date = d.toISOString().substring(0, 10).split("-");
    // console.log(date);

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    console.log("date requesting: ", year, month, day);
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      this.props.history.push("/login");
    }
    Axios.post("/getHistoryDate", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      option: {
        "Access-Control-Allow-Origin": "*",
      },
      year: year,
      month: month,
      day: day,
    })
      .then((result) => {
        console.log(result);
        this.setState({
          data: result.data[0],
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
    // console.log("Render", this.state.data);
    if (this.state.data.length !== 0) {
      this.state.totalCalorie = this.state.data.reduce((sum, data) => {
        return sum + Number(data.history.calorie);
      }, 0);
      // console.log(this.state.totalCalorie);
      printOut = this.state.data.map(function (data, id) {
        return (
          <div key={id} id='list'>
            <li>
              <div>
                Food: {data.history.foodDetected}
                <br></br>
                Time Taken: {data.history.time}
                <br></br>
                Calorie: {data.history.calorie}
              </div>
            </li>
          </div>
        );
      });
      layout = (
        <div id='main'>
          <div id='picker'>
            <h3>Today</h3>
            <DatePicker onChange={this.onDateChange} value={this.state.date} />
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
                  <p id='calorieText'>{this.state.totalCalorie}</p>
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
                  <ol>{printOut}</ol>
                </div>
              </div>
            </div>
            <div id='displayChart'>
              <div>
                <DateRangePicker
                  onChange={this.onRangeChange}
                  value={this.state.range}
                  required={true}
                />
              </div>
              <div>
                <Bar
                  data={this.state.chartData}
                  options={{ maintainAspectRatio: true }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log("No history found at all");
      layout = (
        <div id='main'>
          <div id='picker'>
            <h3>Today</h3>
            <DatePicker onChange={this.onDateChange} value={this.state.date} />
          </div>
          <img
            id='no-data-image'
            src={noDataImg}
            alt='No data found'
            style={{ width: "100%", height: "75vh" }}
          />
        </div>
      );
    }
    return (
      <div>
        <NavbarComponent userLogginStatus={"Logout"} />
        {layout}
      </div>
    );
  }
}

export default History;
