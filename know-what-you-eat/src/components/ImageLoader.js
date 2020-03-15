import React, { Component } from 'react';
// import { Button,View,Text } from 'react-native';
// import { styles } from './css/ImageLoaderStyle.js';
import Axios from 'axios';
import './css/ImageLoader.css';
class ImageLoader extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedFrontImageFile: null,
      selectedSideImageFile:null,
      frontImagePreview: null,
      sideImagePreview: null,
      frontText:'This is sample',
      sideText: 'Me to i am a sample too'
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
          <h1>Please pick a image to find calorie of food</h1>
        </div>
        // <div>
        //   <div style={{flex:1,backgroundColor:'yellow'}}>
        //       <div style={styles.parentView}>
        //         <div style={styles.imageView}>
        //           <div style={styles.imagePicker1}>
        //         <input type="file" name="avatar" onChange={this.fileChangedHandler} />
        //         { $frontPreview }
        //         <Text style={styles.baseText}>{this.state.frontText} </Text>
        //           </div>
        //           <div style={styles.imagePicker2}>
        //             <input type="file" name="avatar" onChange={this.fileSideImageHandler} />
        //             { $sidePreview }
        //             <Text style={styles.baseText}>{this.state.sideText}</Text>
        //           </div>
        //         </div >
        //         <div style={styles.submitButton}>
        //           <Button title="Upload" onPress={this.submitFunction} />
        //         </div>  
        //       </div>
        //     </div>
        // </div>
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