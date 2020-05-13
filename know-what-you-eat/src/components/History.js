import React, { Component } from "react";
import Axios from "axios";
import NavbarComponent from "./NavbarComponent";
import "./css/history.css";
import fire from "./css/assests/fire.png";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
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
      // console.log(this.state.data);
      printOut = this.state.data.map(function (data, id) {
        return (
          <div id="list">
            <li key={id}>
              <div>
                Date: {data.date}
                <br></br>
                Front Fruit: {data.frontFruitName}
                <br></br>
                Side Fruit: {data.sideFruitName}
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
        <div id="main">
          <div id="picker">
            <h3>Today</h3>
          </div>
          <div id="displayData">
            <div style={{display:"flex",flexDirection:"column",backgroundColor:"whitesmoke",alignItems:"center",padding:"0.7%"}}>
              <div id="totalCalorie" alt="Fire icon">
                <div style={{display:"flex",alignSelf:"center",paddingRight:"0.4em"}}>
                  <img style={{height:"25px",opacity:"0.7"}} src={fire} alt="fire icon" />
                </div>
                <h1>205</h1>
                <p id="calText">cal</p>
              </div>
              <div style={{color:"gray",alignItems:"start"}}>
                CALORIE
              </div>
              </div>
              <div id="data">
                <div>
                  Front Food: Apple
                  <br></br>
                  Calorie: 100
                </div>
              {/* <ol>{printOut}</ol> */}
            </div>
          </div>
          <div id="displayChart">
          <h1>chart will be here</h1>
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
