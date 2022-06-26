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


  render() {
    console.log(this.state.byDistanceTime)
    return (
      <div className="App">
        <div className='app-container'>
          <div id="svg-graph-container">
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
