import React, { Component } from "react";
import Axios from "axios";
import NavbarComponent from "./NavbarComponent";
import "./css/history.css";
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
      console.log(this.state.data);
      printOut = this.state.data.map(function (data, id) {
        return (
          <div>
            <li key={id}>
              Date: {data.date}
              <br></br>
              Front Fruit: {data.frontFruitName}
              <br></br>
              Side Fruit: {data.sideFruitName}
              <br></br>
              Time Taken: {data.time}
              <br></br>
              Calorie: {data.calorie}
            </li>
          </div>
        );
      });
    }
    return (
      <div>
        <NavbarComponent userLogginStatus={"Logout"} />
        <h1>HISTORY</h1>
        <div
          id="showData"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="list-type1">
            <ol>{printOut}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
