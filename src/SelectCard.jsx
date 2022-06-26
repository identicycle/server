//React
import React, {Component} from 'react';

export default class SelectCard extends Component {
  constructor(props) {
    super(props);
    this.title = this.props.title;
    this.algorithm = this.props.algorithm;
  }
  
  render() {
    return (
      <div 
        className={`select card ${this.props.current === this.algorithm ? "selected" : ""}`} onMouseOver={() => this.props.switchCurrent(this.algorithm)} 
        onClick={() => this.props.switchCurrent(this.algorithm)}>
        <h4 className={`card-title ${this.algorithm}`}>{this.title}</h4>
        <div className='card-content'>
          <h6>Time: {this.props.time} ms</h6>
          <h6>Overall Time: {this.props.overallTime} ms</h6>
          <h6>Accuracy: {this.props.accuracy}%</h6>
        </div>
      </div>
    );
  }
}
