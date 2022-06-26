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
        <div className={`card-title ${this.algorithm}`}>{this.title}</div>
        <div className='card-content'>
          <div>Time: {this.props.time} ms</div>
          <div>Overall Time: {this.props.overallTime} ms</div>
          <div>Accuracy: {this.props.accuracy}%</div>
        </div>
      </div>
    );
  }
}
