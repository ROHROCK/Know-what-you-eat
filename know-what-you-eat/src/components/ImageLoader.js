import React, { Component } from "react";
import Axios from "axios";
import "./css/ImageLoader.css";
import calculator from "./css/assests/calculator.png";
import tick from "./css/assests/tick.png";
import cross from "./css/assests/wrong.png";
import ImageUploader from "react-images-upload";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import * as legoData from "./lego-loader.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontPicture: [],
      sidePicture: [],
      frontText: "",
      sideText: "",
      calorie: 0,
      loading: false,
    };
    this.submitFunction = this.submitFunction.bind(this);
    this.onFrontDrop = this.onFrontDrop.bind(this);
    this.onSideDrop = this.onSideDrop.bind(this);
  }
  onFrontDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      frontPicture: pictureFiles,
    });
  }
  onSideDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      sidePicture: pictureFiles,
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <FadeIn>
            <div
              style={{
                height: "100vh",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h1>Loading...</h1>
              <Lottie options={defaultOptions} height={300} width={250} />
            </div>
          </FadeIn>
        ) : (
          <div id='background'>
            <div id='instruction'>
              <img src={calculator} alt='calculator' width='50px'></img>
              <h1>Calorie Calculator</h1>
            </div>

            <div id='image-selector'>
              <div id='image-picker-1'>
                <div id='front-selector'>
                  <ImageUploader
                    withIcon={true}
                    buttonText='Front image'
                    onChange={this.onFrontDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    fileContainerStyle={{ width: "300px" }}
                  />
                </div>
              </div>
              <div id='image-picker-2'>
                <div id='side-selector'>
                  <ImageUploader
                    withIcon={true}
                    buttonText='Side image'
                    onChange={this.onSideDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    fileContainerStyle={{ width: "300px" }}
                  />
                </div>
              </div>
            </div>

            <div id='upload-button-section'>
              <button
                id='upload-button'
                title='Upload'
                onClick={this.submitFunction}
              >
                Upload Button
              </button>
            </div>
            <div id='result'>
              <div>
                <h2>Food Detected</h2>
                <div style={{ background: "white" }}>
                  {this.state.frontText}
                </div>
              </div>
              <div>
                <h2>Is the food detected correct ?</h2>
                <img src={tick} width='50px' alt='tick'></img>
                <img src={cross} width='50px' alt='wrong'></img>
              </div>
              <div>
                <h2>Calories</h2>
                <div style={{ background: "white" }}>
                  <p>{this.state.calorie}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  submitFunction = () => {
    if (
      this.state.frontPicture[0] == null &&
      this.state.sidePicture[0] == null
    ) {
      alert("Please select images");
      return;
    }

    //uploading using json
    var fd = new FormData();
    fd.append("topImage", this.state.frontPicture[0]);
    fd.append("sideImage", this.state.sidePicture[0]);
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `bearer ${token}`,
      },
      option: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    this.setState({
      loading: true,
    });
    Axios.post("/uploadImage", fd, config)
      .then((response) => {
        console.log("Response", response);
        this.setState({
          loading: false,
        });
        if (response.status === 200) {
          console.log("The file is successfully uploaded");
        }
        this.setState({
          calorie: response.data.calorie,
          frontText: response.data.frontText,
          sideText: response.data.sideText,
        });
      })
      .catch((error) => {
        console.log("Error uploading file");
      });
  };
}

export default ImageLoader;
