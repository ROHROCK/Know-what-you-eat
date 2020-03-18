import React, { Component } from 'react';
import Axios from 'axios';
import './css/ImageLoader.css';
import calculator from './css/assests/calculator.png'
import imageSelectorImage from './css/assests/Upload.png'
import tick from './css/assests/tick.png'
import cross from './css/assests/wrong.png'

class ImageLoader extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedFrontImageFile: null,
      selectedSideImageFile:null,
      frontImagePreview: null,
      sideImagePreview: null,
      frontText:'',
      sideText: ''
    }
    this.submitFunction = this.submitFunction.bind(this);
  }

  fileChangedHandler = event => {
    this.setState({
      selectedFrontImageFile: event.target.files[0]
    })
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        frontImagePreview: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
  }
  fileSideImageHandler = event =>{
    this.setState({
      selectedSideImageFile: event.target.files[0]
    })
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        sideImagePreview: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
  }

    render() {
      let $frontPreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      let $sidePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      
      if (this.state.frontImagePreview) {
        $frontPreview = (<div className="image-container" ><img src={this.state.frontImagePreview} alt="icon" width="200" /> </div>);
      }
      if(this.state.sideImagePreview){
        $sidePreview = (<div className="image-container" ><img src={this.state.sideImagePreview} alt="icon" width="200" /> </div>)
      }

      return (
        <div id="background">
          <div id="instruction">
            <img src={calculator} alt="calculator" width="50px"></img>
            <h1>Calorie Calculator</h1>
          </div>
          
          <div id="image-selector">
              <div id="image-picker-1">
                <div id="front-selector">
                  <p id="front-text">Front Image</p>
                  <img src={imageSelectorImage} width="100px"></img>
                  {/* <input type="file" name="avatar" onChange={this.fileChangedHandler} /> */}
                    {/* { $frontPreview } */}
                    {/* <h3 >{this.state.frontText} </h3> */}
                </div>
              </div>
              <div id="image-picker-2">
                <div id="side-selector">
                  <p id="side-text">Side Image</p>
                  <img src={imageSelectorImage} width="100px"></img>
                  {/* <input type="file" name="avatar" onChange={this.fileSideImageHandler} /> */}
                    {/* { $sidePreview } */}
                    {/* <h3 >{this.state.sideText}</h3> */}
                  </div>
              </div>
          </div>

          <div id="upload-button-section">
              <button id="upload-button" title="Upload" onClick={this.submitFunction} >Upload Button</button>
          </div>
          <div id="result">
            <div>
              <h2>Food Detected</h2>
              <div style={{background:'white'}}>
                Hello
                {/* This is where the food detected should show */}
                {this.state.frontText}
              </div>
            </div>
            <div>
              <h2>Is the food detected correct ?</h2>
              <img src={tick} width="50px" alt="tick"></img>
              <img src={cross} width="50px" alt="wrong"></img>         
            </div>
            <div>
              <h2>Calories</h2>
              <div style={{background:'white'}}>
                <p>150</p>
              </div>
            </div>
          </div>
        </div>
    );
    }
    submitFunction = () => {
      if(this.state.selectedFrontImageFile == null){
        alert('Please select images');
        return;
      }
        
      //uploading using json 
      var fd = new FormData();
      fd.append('topImage', this.state.selectedFrontImageFile);
      fd.append('sideImage',this.state.selectedSideImageFile);
      const token = localStorage.getItem('jwt');
      const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `bearer ${token}`
        },
        option:{
          'Access-Control-Allow-Origin':'*'
        }
      };
      Axios.post("/uploadImage",fd,config)
          .then((response) => {
              console.log('Response',response);
              if(response.status === 200){
                console.log("The file is successfully uploaded");
              }
          }).catch((error) => {
            console.log("Error uploading file");
      });
    }
}

export default ImageLoader;