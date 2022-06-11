//React
import React from 'react';

//Components
import Graph from './Graph';

//CSS
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Route Testing Ground
        </h3>
      </header>
      <div id="svg-graph-container">
        <Graph/>
      </div>
    </div>
  );
}

export default App;
