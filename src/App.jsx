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
    this.reset = this.reset.bind(this);

    this.switchCurrent = this.switchCurrent.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.reset); //for reset
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.reset);
  }
  
  reset(event) {
    if(this.graphRef && !this.graphRef.current.contains(event.target) && this.selectionRef && !this.selectionRef.current.contains(event.target)) {
      console.log("reset")
      //reset
      
      //remove origin & destination
      d3.select("#node-origin").remove();
      d3.select("#node-destination").remove();

      //remove path nodes
      d3.selectAll(".path-container").remove();

      //reset origin & destination
      // this.setState({
      //   origin: {
      //     id: -1,
      //     x: 100,
      //     y: 100
      //   },
      //   destination: {
      //     id: -1,
      //     x: 1000,
      //     y: 600
      //   }
      // })
    }
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
            <Graph current={this.state.algorithm} wrapperRef={this.graphRef}/>
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
