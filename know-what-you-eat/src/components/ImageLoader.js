import React, { Component } from 'react';
import { Button } from 'react-native';
import './css/ImageLoader.css';

class ImageLoader extends Component {
  constructor(props){
    super(props)
    this.state = {
      image : null
    }
    this.onImageChange = this.onImageChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onImageChange = event =>{
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();
      reader.onload = (e) =>{
        this.setState({image:event.target.result})
      };
      reader.readAsDataURL(event.target.files[0])
    }
    console.log(event.target.files[0]);
  }

  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
 
    let reader = new FileReader();
     
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
 
    reader.readAsDataURL(event.target.files[0])
 
  }
    render() {
      let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
      if (this.state.imagePreviewUrl) {
        $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
      }
        return (
          <div>
            <h1> Upload Image</h1>
            <input type="file" name="avatar" onChange={this.fileChangedHandler} />
            <Button title="Upload" onPress={this.submit} /> 
            <input type="submit" text="click me" onClick={this.submit}>Click me</input>
            { $imagePreview }
          </div>
    );

    }
    submit = () => {
      console.log("Submit function invoked !");
      if(this.state.image)
        console.log('Image selected')
      else
        console.log('Image not selected')
      // var fd = new FormData();
      // fd.append('file', this.state.selectedFile);
      // var request = new XMLHttpRequest();
      // request.onreadystatechange = function() {
      //   if (this.readyState === 4 &amp;&amp; this.status === 200) {
      //     alert('Uploaded!');
      //   }
      // };
      // request.open("POST", "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload", true);
      // request.send(fd);
  }
}

export default ImageLoader;
