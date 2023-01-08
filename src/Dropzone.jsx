//React
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

//CSS
import './Dropzone.css';


export default class ImagesUpload extends Component {
  constructor(props) {
    super(props);
  }

  getimageUploadText() {
    if (!this.props.uploadedPhotos) {
      return 'No file chosen';
    }
    var numFiles = this.props.uploadedPhotos.length;
    if(numFiles === 0) {
      return 'No file chosen';
    } else if(numFiles === 1) {
      return this.props.uploadedPhotos[0].name;
    } else {
      return numFiles + ' files uploaded';
    }
  }

  render() {
    return (
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <section className="dropzone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>{this.getimageUploadText()}</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}


