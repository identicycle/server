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
    this.width = 1000;
    this.height = 800;
    this.margin = {
      top: 5,
      bottom: 5,
      right: 5,
      left: 5
    }
    this.node = {
      lowestX: 0,
      lowestY: 0,
      highestX: 0,
      highestY: 0
    }
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
      connection_size: 1,
      node_size: 2
    }
  }

  componentDidMount() {
    if(!this.state.SVGCreated) { //to avoid creating multiple svg
      this.createSVG();
      this.createConnections();
      this.createNodes();
    }
  }

  createSVG() {
    // get highest & lowest data
    let [highestX, lowestX] = data_analysis.findHighestLowestX(intersectional_node_data);
    let [highestY, lowestY] = data_analysis.findHighestLowestY(intersectional_node_data);

    // get margins
    let margin = {
      top: highestY * 0.05,
      bottom: highestY * 0.05,
      right: highestX * 0.05,
      left: highestX * 0.05,
    }
    let height = highestY + margin.top + margin.bottom;
    let width = highestX + margin.right + margin.left;

    d3.select("#svg-graph-container")
      .append("svg")
      .attr("viewBox", `${lowestX} ${lowestY} ${width} ${height}`)
      .attr("id", "svg-graph")
      .attr("preserveAspectRatio", true)
    
    let node_size = highestX/100;
    let connection_size = highestX/200;

    //save
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.node = {
      lowestX: lowestX,
      lowestY: lowestY,
      highestX: highestX,
      highestY: highestY
    }

    this.setState({
      "node_size": node_size > 2 ? node_size : 2,
      "connection_size": connection_size > 1? connection_size : 1,
      "SVGCreated": true //to avoid creating multiple svg
    });
  }

  createNodes() {
    let nodeContainer = d3.select("#svg-graph").append("g").attr("id", "node-container");
    // this.state.node.highestX * 0.005;
    
    for (let id in intersectional_node_data) {
      let intersectional_node = intersectional_node_data[id];

      nodeContainer.append("circle")
        .attr("id", `intersectional-node-${id}`)
        .attr("class", "node")
        .attr("node_id", id)
        .attr("class", "intersectional-node")
        .attr("cx", intersectional_node.x + this.margin.left)
        .attr("cy", intersectional_node.y + this.margin.top)
        .attr("r",  this.state.node_size)
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
            console.log("For testing", origin, typeof origin, destination, id, typeof id, id === origin)
            
            if(!origin) { //if origin doesn't exist => make the clicked node origin
              this.onClickOrigin(id, elementId);
            } else if(origin && !destination && id != origin) { //if origin exist & destination doesn't exist and if the destination is not equal to origin
              this.onClickDestination(id, elementId);
            } else { //if both origin & destination exist ignore it
            }
        });
    }

  }

  createConnections() {
    let svg = d3.select("#svg-graph");

    for(let id in intersectional_connection_data) {
      var connection = intersectional_connection_data[id];
      
      d3.select("#svg-graph")
      .append('line')
      .style("stroke", "black")
      .style("stroke-width", this.state.connection_size)
      .attr("x1", connection.c1_node.x + this.margin.left)
      .attr("y1", connection.c1_node.y + this.margin.top)
      .attr("x2", connection.c2_node.x + this.margin.left)
      .attr("y2", connection.c2_node.y + this.margin.top);
    }
  }

  onClickOrigin(id, elementId) {
    d3.select(elementId)
      .attr("id", "node-origin")
      .attr("r", this.state.node_size * 2)
      .style("fill", "green")

    this.setState({
      origin: intersectional_node_data[id]
    });
  }

  onClickDestination(id, elementId) {
    d3.select(elementId)
      .attr("id", "node-destination")
      .attr("r",  this.state.node_size * 2)
      .style("fill", "red")
    
    console.log(id, elementId)
    this.setState({
      destination: intersectional_node_data[id]
    });

    this.findShortestPath(id);
  }

  findShortestPath(id) {
    let origin = this.state.origin;
    
    console.log(`${origin.id}`, `${id}`, intersectional_node_data, intersectional_connection_data)
    let pathNodes = dijkstra.shortest(`${origin.id}`, `${id}`, intersectional_node_data, intersectional_connection_data);
    console.log(pathNodes)
    // let pathNodes = dijkstra.shortest(origin.id, destination.id, intersectional_node_data, intersectional_connection_data);
    // console.log(pathNodes)
    this.createPathNodes(pathNodes);
  }

  createPathNodes(pathNodes) {
    let pathContainer = d3.select("#svg-graph").append("g").attr("id", "path-container");

    pathNodes.forEach((node) => {
      let id = node.id;
      pathContainer.append("circle")
        .attr("id", `path-node-${node.id}`)
        .attr("node_id", id)
        .attr("class", "path-node")
        .attr("cx", node.x + this.margin.left)
        .attr("cy", node.y + this.margin.top)
        .attr("r",  this.state.node_size * 1.5)
        .style("fill", "blue")
    })
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
        <div id="svg-graph-container"/>
      </div>
    )
  }
}
