//React
import React, { Component }  from 'react';

//Library
import * as d3 from "d3";

export default class Graph extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createSVG()
  }

  createSVG() {
    const width = 600;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 30, left: 60 }

    var svg = d3.select("#graph")
    .append("circle")
      .attr("cx", 150)
      .attr("cy", 70)
      .attr("r",  10)

  }

  render() {
    return <svg id="graph" width={600} heigh={300}/>
  }
}
