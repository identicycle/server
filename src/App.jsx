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
      algorithm: "sloppyDijkstra"
    }

    //for reset function
    this.graphRef = React.createRef(); 
    this.selectionRef = React.createRef(); 

    this.switchCurrent = this.switchCurrent.bind(this);
  }

  switchCurrent(algorithm) { //switch to different algorithm
    this.setState({algorithm: algorithm});
  }

  render() {
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
              graphRef={this.graphRef} selectionRef={this.selectionRef}/>
          </div>
          <div className='selection-container'>
            <Selection current={this.state.algorithm} switchCurrent={this.switchCurrent} 
              wrapperRef={this.selectionRef}/>
          </div>
        </div>
      </div>
    );
  }
}
