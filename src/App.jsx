//React
import React, {Component} from 'react';

//Library
import * as d3 from "d3";

//Components
import Graph from './Graph';
import Selection from './Selection';

//CSS
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: "sloppyDijkstra",
      bruteForceTime: 0,
      dijkstraTime: 0,
      sloppyDijkstraTime: 0,
      byDistanceTime: 0,
      overallBruteForceTime: 0,
      overallDijkstraTime: 0,
      overallSloppyDijkstraTime: 0,
      overallByDistanceTime: 0,
      checkingPerformance: false
    }

    //for reset function
    this.graphRef = React.createRef(); 
    this.selectionRef = React.createRef(); 

    this.switchCurrent = this.switchCurrent.bind(this);
    this.updatePerformanceTimes = this.updatePerformanceTimes.bind(this);
    this.startPerformanceCheck = this.startPerformanceCheck.bind(this);
    this.stopPerformanceCheck = this.stopPerformanceCheck.bind(this);
  }

  switchCurrent(algorithm) { //switch to different algorithm
    this.setState({algorithm: algorithm});
  }

  updatePerformanceTimes(times) {
    this.setState(times)
  }

  startPerformanceCheck() {
    this.setState({checkingPerformance: true});
  }

  stopPerformanceCheck(overallTimes) {
    this.setState({checkingPerformance: false});
    this.setState(overallTimes);
  }

  render() {
    console.log(this.state.byDistanceTime)
    return (
      <div className="App">
        <header className="App-header">
          <h3>
            Routing Algorithm Testing Ground
          </h3>
        </header>
        <div className='app-container'>
          <div id="svg-graph-container">
            <Graph current={this.state.algorithm} 
              updatePerformanceTimes={this.updatePerformanceTimes}
              checkingPerformance={this.state.checkingPerformance} 
              stopPerformanceCheck={this.stopPerformanceCheck}
              graphRef={this.graphRef} selectionRef={this.selectionRef}/>
          </div>
          <div className='selection-container'>
            <Selection current={this.state.algorithm} switchCurrent={this.switchCurrent}
              bruteForceTime={this.state.bruteForceTime}
              dijkstraTime={this.state.dijkstraTime}
              sloppyDijkstraTime={this.state.sloppyDijkstraTime}
              byDistanceTime={this.state.byDistanceTime}
              overallBruteForceTime={this.state.overallBruteForceTime}
              overallDijkstraTime={this.state.overallDijkstraTime}
              overallSloppyDijkstraTime={this.state.overallSloppyDijkstraTime}
              overallByDistanceTime={this.state.overallByDistanceTime}
              checkingPerformance={this.state.checkingPerformance} 
              startPerformanceCheck={this.startPerformanceCheck}
              wrapperRef={this.selectionRef}/>
          </div>
        </div>
      </div>
    );
  }
}
