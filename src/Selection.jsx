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
        <SelectCard title="Dijkstra" algorithm="dijkstra" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.times.dijkstra}/>
        <SelectCard title="Sloppy Dijkstra" algorithm="sloppyDijkstra" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.times.sloppyDijkstra}/>
        <SelectCard title="By Distance" algorithm="byDistance" 
          current={this.props.current} switchCurrent={this.props.switchCurrent}
          time={this.props.times.byDistance}/>
      </div>
    );
  }
}
