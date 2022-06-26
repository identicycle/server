//React
import React, {Component} from 'react';

//Components
import SelectCard from './SelectCard';

//CSS
import './Selection.css';

export default class Selection extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="selection" ref={this.props.wrapperRef}>
        <SelectCard title="By Distance" algorithm="byDistance" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.byDistanceTime} overallTime={this.props.overallByDistanceTime}/>
        <SelectCard title="Sloppy Dijkstra" algorithm="sloppyDijkstra" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.sloppyDijkstraTime} overallTime={this.props.overallSloppyDijkstraTime}/>
        <SelectCard title="Dijkstra" algorithm="dijkstra" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.dijkstraTime} overallTime={this.props.overallDijkstraTime}/>
        {/* <SelectCard title="Brute Force" algorithm="bruteForce" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.bruteForceTime}/> */}
        <button onClick={this.props.startPerformanceCheck}>
          Check Performance
        </button>
      </div>
    );
  }
}
