//React
import React, { Component }  from 'react';

//Library
import * as d3 from "d3";

//Algorithms
import route_algorithms from './route_algorthms/route_algorithms';

//Sample Data
import intersectional_node_data from './sample_datas/intersectional_node_data';
import intersectional_connection_data from './sample_datas/intersectional_connection_data';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    // const width = 1200;
    // const height = 800;
    // const margin = { top: 30, right: 30, bottom: 30, left: 60 }
    this.state = {
      origin: {
        id: 1,
        x: 100,
        y: 100
      },
      destination: {
        id: 6,
        x: 1000,
        y: 600
      }
    }
  }

  componentDidMount() {
    this.createConnections();
    this.createNodes();
  }

  createNodes() {
    let svg = d3.select("#graph");
    
    for (let id in intersectional_node_data) {
      let intersectional_node = intersectional_node_data[id];

      svg.append("circle")
        .attr("id", `intersectional-node-${id}`)
        .attr("class", "intersectional-node")
        .attr("cx", intersectional_node.x)
        .attr("cy", intersectional_node.y)
        .attr("r",  10)
        .style("fill", "black")
        .on('mouseover', (data) => {
          // console.log(data.target.id)
          d3.select(`#${data.target.id}`)
            .style("fill", "green")
        })
        .on('mouseout', () => {

        })
        .on('click', (data) => {
          console.log("Clicking???", `#${data.target.id}`)
          d3.select(`#${data.target.id}`)
            .attr("r",  20)
            .style("fill", "green")
        });
    }

  }

  createConnections() {
    let svg = d3.select("#graph");

    for(let id in intersectional_connection_data) {
      var connection = intersectional_connection_data[id];
      
      d3.select("#graph")
      .append('line')
      .style("stroke", "black")
      .style("stroke-width", 5)
      .attr("x1", connection.c1_node.x)
      .attr("y1", connection.c1_node.y)
      .attr("x2", connection.c2_node.x)
      .attr("y2", connection.c2_node.y);
    }
  }

  reset() {
    // this.forceUpdate()
  }

  runBruteForceAlgorthim() {
    let origin = this.state.origin;
    let destination = this.state.destination;

    route_algorithms.brute_force(origin, destination, intersectional_node_data, intersectional_connection_data);
  }

  render() {
    return (
      <div>
        <button onClick={this.reset}>Reset</button>
        <svg id="graph" width={1200} height={800}/>
      </div>
    )
  }
}
