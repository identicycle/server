//React
import React from 'react';

//Library
import { BrowserView, MobileView, isMobile } from 'react-device-detect';

const SelectCardContent = (props) => {
  return (
    <div className={`card-content ${isMobile ? "mobile" : "browser"}`}>
      <BrowserView>
        <h6>Time: {props.time} ms</h6>
        <h6>Overall Time: {props.overallTime} ms</h6>
        <h6>Accuracy: {props.accuracy}%</h6>
      </BrowserView>
      <MobileView>
        <h4>Time: {props.time} ms</h4>
        <h4>Overall Time: {props.overallTime} ms</h4>
        <h4>Accuracy: {props.accuracy}%</h4>
      </MobileView>
    </div>
  );
}

export default SelectCardContent