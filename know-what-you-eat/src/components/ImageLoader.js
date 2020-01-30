import React, { Component } from 'react';
import { Button } from 'react-native';
import './css/ImageLoader.css';
import Axios from 'axios';
// import {withRouter} from 'react-router';

class ImageLoader extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedFrontImageFile: null,
      selectedSideImageFile:null,
      frontImagePreview: null,
      sideImagePrview: null
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

    render() {
      let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      if (this.state.frontImagePreview) {
        $imagePreview = (<div className="image-container" ><img src={this.state.frontImagePreview} alt="icon" width="200" /> </div>);
      }
      return (
        <div>
            <h1>Upload Image</h1>
            <input type="file" name="avatar" onChange={this.fileChangedHandler} />
            { $imagePreview }
            <Button title="Upload" onPress={this.submitFunction} />             
        </div>
    );
    }
    submitFunction = () => {
      console.log("Submit function invoked !");
      if(this.state.selectedFrontImageFile != null)
        console.log('image data: ',this.state.selectedFrontImageFile);
      else
        console.log('Image not selected');
      //uploading using json 
      console.log("Data to be sent",this.state.selectedFrontImageFile)
      // const jwt = localStorage.getItem('jwt');
      //   if(!jwt)
      //       this.props.history.push('/login');
      //   // Asynch call
      //   Axios.post('/uploadImage',{
      //       headers:{
      //           'Authorization':`Bearer ${jwt}`
      //       },
      //       option:{
      //           'Access-Control-Allow-Origin':'*'
      //       },
      //       body:{
      //         'imageType':'Front-Image',
      //         'image': state.selectedFrontImageFile
      //       }
      //       }).then(
      //       res => {
      //           console.log('Image Type',res);
      //   }).catch(err => {
      //           console.log("ERR",err);
      //           localStorage.removeItem('jwt');
      //           this.props.history.push('/login');
      //       });
      var fd = new FormData();
      fd.append('topImage', this.state.selectedFrontImageFile);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        },
        option:{
          'Access-Control-Allow-Origin':'*'
        }
      };
      Axios.post("/uploadImage",fd,config)
          .then((response) => {
              console.log("The file is successfully uploaded");
          }).catch((error) => {
            console.log("Error uploading file");
      });
    }
}

export default ImageLoader;
