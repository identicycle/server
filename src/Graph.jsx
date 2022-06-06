//React
import React, { Component }  from 'react';

//Library
import * as d3 from "d3";

//Sample Data
import intersectional_node_data from './sample_datas/intersectional_node_data';
import intersectional_connection_data from './sample_datas/intersectional_connection_data';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    // const width = 1200;
    // const height = 800;
    // const margin = { top: 30, right: 30, bottom: 30, left: 60 }
  }

  componentDidMount() {
    this.createNodes();
    this.createConnections();
  }

  createNodes() {
    let svg = d3.select("#graph");
    
    for (let id in intersectional_node_data) {
      let node = intersectional_node_data[id];
      console.log(node)
      svg.append("circle")
        .attr("class", "intersectional-node")
        .attr("cx", node.x)
        .attr("cy", node.y)
        .attr("r",  10)
        .style("fill", "black");
    }

  }

  createConnections() {
    // let svg = d3.select("#graph");

    // fot
    // var connection = d3.select("#graph")
    //   .append('line')
    //   .style("stroke", "black")
    //   .style("stroke-width", 5)
    //   .attr("x1", 150)
    //   .attr("y1", 70)
    //   .attr("x2", 450)
    //   .attr("y2", 70);
  }

  render() {
    return <svg id="graph" width={1200} height={800}/>
  }
}
