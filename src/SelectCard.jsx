//React
import React, {Component} from 'react';

//Library
import { BrowserView, isMobile } from 'react-device-detect';

//Component
import SelectCardContent from './SelectCardContent';

export default class SelectCard extends Component {
  constructor(props) {
    super(props);
    this.title = this.props.title;
    this.algorithm = this.props.algorithm;
  }
  
  render() {
    return (
      <div 
        className={`select card ${this.props.current === this.algorithm ? "selected" : ""} ${isMobile ? "mobile" : "browser"}`} onMouseOver={isMobile ? () => {} : () => this.props.switchCurrent(this.algorithm)} 
        onClick={() => this.props.switchCurrent(this.algorithm)}>
        <h4 className={`card-title ${this.algorithm}`}>{this.title}</h4>
        <BrowserView>
          <SelectCardContent accuracy={this.props.accuracy}
            time={this.props.time} overallTime={this.props.overallTime}/>
        </BrowserView>
      </div>
    );
  }
}
