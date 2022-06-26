//React
import React, {Component} from 'react';

//Library
import { isMobile } from 'react-device-detect';

//Components
import Graph from './Graph';
import Selection from './Selection';
import SelectCardContent from './SelectCardContent';

//CSS
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      algorithm: "sloppyDijkstra",
      bruteForceTime: 0,
      dijkstraTime: 0,
      sloppyDijkstraTime: 0,
      byDistanceTime: 0,
      overallBruteForceTime: 0,
      overallDijkstraTime: 0,
      overallSloppyDijkstraTime: 0,
      overallByDistanceTime: 0,
      bruteForceAccuracy: 0,
      dijkstraAccuracy: 0,
      sloppyDijkstraAccuracy: 0,
      byDistanceAccuracy: 0,
      checkingPerformance: false
    }

    //for reset function
    this.graphRef = React.createRef(); 
    this.selectionRef = React.createRef(); 

    this.switchCurrent = this.switchCurrent.bind(this);
    this.updatePerformance = this.updatePerformance.bind(this);
    this.startPerformanceCheck = this.startPerformanceCheck.bind(this);
    this.stopPerformanceCheck = this.stopPerformanceCheck.bind(this);
  }

  componentDidMount(){
    if(isMobile) {
      this.resizeMobile();
      window.removeEventListener("resize", this.resizeMobile);
    }
    this.startPerformanceCheck();
  }

  switchCurrent(algorithm) { //switch to different algorithm
    this.setState({algorithm: algorithm});
  }

  updatePerformance(obj) {
    this.setState(obj)
  }

  startPerformanceCheck() {
    this.setState({checkingPerformance: true});
  }

  stopPerformanceCheck(overallTimes) {
    this.setState({checkingPerformance: false});
    this.setState(overallTimes);
  }

  resizeMobile() {
    let { innerWidth: width, innerHeight: height } = window;
    this.setState({width, height});
  }

  render() {
    let algorithm = this.state.algorithm;

    return (
      <div className={`App ${isMobile ? "mobile" : "browser"}`} 
        style={isMobile && {width: this.state.width, height: this.state.height}}>
        <div className={`app-container ${isMobile ? "mobile" : "browser"}`}>
          <div id="svg-graph-container" className={isMobile ? "mobile" : "browser"}>
            <header className="App-header">
              <h3>
                Routing Algorithm Testing Ground
              </h3>
            </header>
            <Graph current={this.state.algorithm} 
              updatePerformance={this.updatePerformance}
              checkingPerformance={this.state.checkingPerformance}
              stopPerformanceCheck={this.stopPerformanceCheck}
              graphRef={this.graphRef} selectionRef={this.selectionRef}/>
            { isMobile &&
            <SelectCardContent 
              time={this.state[`${algorithm}Time`]} 
              overallTime={this.state[`overall${algorithm[0].toUpperCase() + algorithm.slice(1)}Time`]}
              accuracy={this.state[`${algorithm}Accuracy`]}/>}
          </div>
          <div className={`selection-container ${isMobile ? "mobile" : "browser"}`}>
            <Selection current={this.state.algorithm} switchCurrent={this.switchCurrent}
              bruteForceTime={this.state.bruteForceTime}
              dijkstraTime={this.state.dijkstraTime}
              sloppyDijkstraTime={this.state.sloppyDijkstraTime}
              byDistanceTime={this.state.byDistanceTime}
              overallBruteForceTime={this.state.overallBruteForceTime}
              overallDijkstraTime={this.state.overallDijkstraTime}
              overallSloppyDijkstraTime={this.state.overallSloppyDijkstraTime}
              overallByDistanceTime={this.state.overallByDistanceTime}
              bruteForceAccuracy={this.state.bruteForceAccuracy}
              dijkstraAccuracy={this.state.dijkstraAccuracy}
              sloppyDijkstraAccuracy={this.state.sloppyDijkstraAccuracy}
              byDistanceAccuracy={this.state.byDistanceAccuracy}
              checkingPerformance={this.state.checkingPerformance}
              wrapperRef={this.selectionRef}/>
          </div>
        </div>
      </div>
    );
  }
}
