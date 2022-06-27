//React
import React, {Component} from 'react';

//Library
import { isMobile } from 'react-device-detect';

//Components
import SelectCard from './SelectCard';

//CSS
import './Selection.css';

export default class Selection extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log("by distance", this.props.byDistanceDistance)
    return (
      <div className={`selection ${isMobile ? "mobile" : "browser"}`} ref={this.props.wrapperRef}>
        <SelectCard title="By Distance" algorithm="byDistance" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.byDistanceTime} overallTime={this.props.overallByDistanceTime}
          distance={this.props.byDistanceDistance} accuracy={this.props.byDistanceAccuracy}/>
        <SelectCard title="Sloppy Dijkstra" algorithm="fastDijkstra" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.fastDijkstraTime} overallTime={this.props.overallfastDijkstraTime}
          distance={this.props.fastDijkstraDistance} accuracy={this.props.fastDijkstraAccuracy}/>
        <SelectCard title="Dijkstra" algorithm="dijkstra" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.dijkstraTime} overallTime={this.props.overallDijkstraTime}
          distance={this.props.dijkstraDistance} accuracy={this.props.dijkstraAccuracy}/>
        {/* <SelectCard title="Brute Force" algorithm="bruteForce" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.bruteForceTime} overallTime={this.props.overallBruteForceTime}
          accuracy={this.props.bruteForceAccuracy}/> */}
      </div>
    );
  }
}
