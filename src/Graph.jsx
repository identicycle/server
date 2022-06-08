//React
import React, { Component }  from 'react';

//Library
import * as d3 from "d3";

//CSS
import "./Graph.css";

//Algorithms
import data_analysis from './helper_functions/data_analysis';
import dijkstra from './helper_functions/dijkstra';
// import route_algorithms from './helper_functions/route_algorithms';

//Sample Data
//NODE ID SHOULD NEVER BE ZERO
import intersectional_node_data from './sample_datas/ind';
import intersectional_connection_data from './sample_datas/icd';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    // const width = 1200;
    // const height = 800;
    // const margin = { top: 30, right: 30, bottom: 30, left: 60 }
    this.state = {
      SVGCreated: false,
      origin: {
        id: 0,
        x: 100,
        y: 100
      },
      destination: {
        id: 0,
        x: 1000,
        y: 600
      },
      node: {
        lowestX: 0,
        lowestY: 0,
        highestX: 0,
        highestY: 0
      }
      // margin: {
      //   marginTop: 0,
      //   marginBottom: 0,
      //   marginRight: 0,
      //   marginLeft: 0
      // }
    }
  }

  componentDidMount() {
    if(!this.state.SVGCreated) {
      this.createSVG();
    }
    this.createConnections();
    this.createNodes();
  }

  createSVG() {
    let [highestX, lowestX] = data_analysis.findHighestLowestX(intersectional_node_data);
    let [highestY, lowestY] = data_analysis.findHighestLowestY(intersectional_node_data);

    d3.select("#graph-container")
      .append("svg")
      .attr("viewBox", `${lowestX} ${lowestY} ${highestX} ${highestY}`)
      .attr("id", "graph")
      .attr("preserveAspectRatio", true)

    this.setState({
      "node": {
        lowestX: lowestX,
        lowestY: lowestY,
        highestX: highestX,
        highestY: highestY
      },
      "SVGCreated": true
    });
  }

  createNodes() {
    let svg = d3.select("#graph");
    let node_size = 2;
    // this.state.node.highestX * 0.005;
    
    for (let id in intersectional_node_data) {
      let intersectional_node = intersectional_node_data[id];

      svg.append("circle")
        .attr("id", `intersectional-node-${id}`)
        .attr("node_id", id)
        .attr("class", "intersectional-node")
        .attr("cx", intersectional_node.x)
        .attr("cy", intersectional_node.y)
        .attr("r",  node_size)
        .style("fill", "black")
        // .on('mouseover', (data) => {
        //   // console.log(data.target.id)
        //   // d3.select(`#${data.target.id}`)
        //   //   .style("fill", "green")
        // })
        // .on('mouseout', () => {

        // })
        .on('click', (data) => {
            //id of clicked node => ex. intersectional-node-31
            let elementId = `#${data.target.id}`
            
            //get node id => ex. 31
            let id = data.target.attributes.node_id.value;

            //NODE ID SHOULD NEVER BE ZERO
            let origin = this.state.origin.id;
            let destination = this.state.destination.id;
            
            if(!origin) { //if origin doesn't exist => make the clicked node origin
              this.onClickOrigin(id, elementId);
            } else if(origin && !destination) { //if origin exist & destination doesn't exist
              this.onClickDestination(id, elementId);
            } else { //if both origin & destination exist ignore it
            }
        });
    }

  }

  createConnections() {
    let svg = d3.select("#graph");
    let connection_size = 1;
    // this.state.node.highestX * 0.01;

    for(let id in intersectional_connection_data) {
      var connection = intersectional_connection_data[id];
      
      d3.select("#graph")
      .append('line')
      .style("stroke", "black")
      .style("stroke-width", connection_size)
      .attr("x1", connection.c1_node.x)
      .attr("y1", connection.c1_node.y)
      .attr("x2", connection.c2_node.x)
      .attr("y2", connection.c2_node.y);
    }
  }

  onClickOrigin(id, elementId) {
    d3.select(elementId)
      .attr("r",  4)
      .style("fill", "green")

    this.setState({
      origin: intersectional_node_data[id]
    });
  }

  onClickDestination(id, elementId) {
    d3.select(elementId)
      .attr("r",  4)
      .style("fill", "red")
    
    console.log(id, elementId)
    this.setState({
      destination: intersectional_node_data[id]
    });

    this.findShortestPath(id);
  }

  findShortestPath(id) {
    let origin = this.state.origin;
    console.log("here?")
    
    console.log(origin.id, typeof origin.id, id, typeof id)
    let pathNodes = dijkstra.shortest(`${origin.id}`, `${id}`, intersectional_node_data, intersectional_connection_data);
    console.log(pathNodes)
    // let pathNodes = dijkstra.shortest(origin.id, destination.id, intersectional_node_data, intersectional_connection_data);
    // console.log(pathNodes)
  }

  reset() {
    // this.forceUpdate()
  }

  // runBruteForceAlgorthim() {
  //   let origin = this.state.origin;
  //   let destination = this.state.destination;

  //   route_algorithms.brute_force(origin, destination, intersectional_node_data, intersectional_connection_data);
  // }

  render() {
    return (
      <div>
        {/* <button onClick={this.reset}>Reset</button> */}
        <div id="graph-container"/>
      </div>
    )
  }
}
