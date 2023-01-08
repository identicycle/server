//React
import React, {Component} from 'react';

//Library
import { isMobile } from 'react-device-detect';

//Components
import ImagesUpload from './Dropzone';


//CSS
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    // if(isMobile) {
    //   this.resizeMobile();
    //   window.removeEventListener("resize", this.resizeMobile);
    // }
  }

  resizeMobile() {
    let { innerWidth: width, innerHeight: height } = window;
    this.setState({width, height});
  }

  render() {
    return (
      <div className={`App ${isMobile ? "mobile" : "browser"}`}>
        <div className={`app-container ${isMobile ? "mobile" : "browser"}`}>
            <header className="App-header">
              <h3>
                Trash Saver Website
              </h3>
            </header>
            <ImagesUpload/>
        </div>
      </div>
    );
  }
}
