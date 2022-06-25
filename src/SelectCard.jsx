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
        <div>
          <div>Time: {this.props.time}</div>
        </div>
      </div>
    );
  }
}
