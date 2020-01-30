import React, { Component } from 'react';
import { Button, View } from 'react-native';
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
      sideImagePreview: null
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
        <div>
            <h1>Upload Image</h1>
            {/* <View style={{}}> */}
            <input type="file" name="avatar" onChange={this.fileChangedHandler} />
            { $frontPreview }
            <input type="file" name="avatar" onChange={this.fileSideImageHandler} />
            { $sidePreview }
            <Button title="Upload" onPress={this.submitFunction} />
            {/* </View>              */}
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
      var fd = new FormData();
      fd.append('topImage', this.state.selectedFrontImageFile);
      fd.append('sideImage',this.state.selectedSideImageFile);
      
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
              console.log('Response',response);
          }).catch((error) => {
            console.log("Error uploading file");
      });
    }
}

export default ImageLoader;
