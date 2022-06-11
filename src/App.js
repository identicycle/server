//React
import React, { Component }  from 'react';

//Components
import Graph from './Graph';

//CSS
import './App.css';
import { render } from '@testing-library/react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: false
    }
  }

  startReset() {
    this.setState({
      reset: true
    });
  }

  endReset() {
    this.setState({
      reset: false
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>
            Route Testing Ground
          </h3>
        </header>
        <Graph reset={this.state.reset} 
          startReset={this.startReset.bind(this)} endReset={this.endReset.bind(this)}/>
      </div>
    );
  }
}
