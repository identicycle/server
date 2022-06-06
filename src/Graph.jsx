//React
import React, { Component }  from 'react';

//Library
import * as d3 from "d3";

export default class Graph extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createNodes()
    this.createConnections()
  }

  createNodes() {
    const width = 600;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 30, left: 60 }

    var circle1 = d3.select("#graph")
    .append("circle")
      .attr("cx", 150)
      .attr("cy", 70)
      .attr("r",  10)
    
    var circle2 = d3.select("#graph")
      .append("circle")
        .attr("cx", 450)
        .attr("cy", 70)
        .attr("r",  10)

  }

  createConnections() {
    var connection = d3.select("#graph")
      .append('line')
      .style("stroke", "black")
      .style("stroke-width", 5)
      .attr("x1", 150)
      .attr("y1", 70)
      .attr("x2", 450)
      .attr("y2", 70)
      .attr("stroke", "black");
  }

  render() {
    return <svg id="graph" width={600} heigh={300}/>
  }
}
