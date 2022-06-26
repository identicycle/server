//React
import React, { Component }  from 'react';

//Library
import * as d3 from "d3";
import { isMobile } from 'react-device-detect';

//CSS
import "./Graph.css";

//Algorithms
import data_analysis from './helperFunctions/dataAnalysis';
import bruteForce from './routeFunctions/bruteForce';
import dijkstra from './routeFunctions/dijkstra';
import sloppyDijkstra from './routeFunctions/sloppyDijkstra';
import byDistance from './routeFunctions/byDistance';
// import route_algorithms from './helperFunctions/routeAlgorithms';

import gxCalculation from './routeFunctions/gxCalculation';

import performance from './routeFunctions/performance';

//Sample Data
//NODE ID SHOULD NEVER BE ZERO
import intersectional_node_data from './sample_data/ind';
import intersectional_connection_data from './sample_data/icd';

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

    //for route algorithm
    this.gx = {};

    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    if(!this.state.SVGCreated) { //to avoid creating multiple svg
      this.createSVG();
      this.createConnections();
      this.createNodes();
      this.gx = gxCalculation(intersectional_node_data);
      document.addEventListener("mousedown", this.reset); //for reset
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.reset);
  }
  
  reset(event) {
    if(this.props.graphRef && !this.props.graphRef.current.contains(event.target) && this.props.selectionRef && !this.props.selectionRef.current.contains(event.target)) {
      //remove origin & destination
      d3.select("#node-origin").remove();
      d3.select("#node-destination").remove();

      //remove path nodes
      d3.selectAll(".path-container").remove();

      //reset origin & destination
      this.setState({
        origin: {
          id: 0,
          x: 100,
          y: 100
        },
        destination: {
          id: 0,
          x: 1000,
          y: 600
        }
      });

      //set performance time to o
      this.props.updatePerformance({
        byDistanceTime: 0,
        sloppyDijkstraTime: 0,
        dijkstraTime: 0,
        bruteForceTime: 0
      });
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

    d3.select("#svg-graph")
      .attr("viewBox", `${lowestX} ${lowestY} ${width} ${height}`)
    
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
    let nodeContainer = d3.select(".node-container")
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
        .on('mouseover', () => { //on hover make the node bigger
          if(!this.state.destination.id || isMobile){ //disable when path is shown & mobile
            d3.select(`#intersectional-node-${id}`)
              .attr("r", this.state.node_size * 1.2)
          }
        })
        .on('mouseout', () => { //when mouse stops hovering change the node size back to normal
          if(!this.state.destination.id || isMobile){ //disable when path is shown & mobile
            d3.select(`#intersectional-node-${id}`)
              .attr("r", this.state.node_size)
          }
        })
        .on('click', () => {
          //id of clicked node => ex. intersectional-node-31
          let elementId = `#intersectional-node-${id}`

          //NODE ID SHOULD NEVER BE ZERO
          let origin = this.state.origin.id;
          let destination = this.state.destination.id;
          // console.log("For testing", origin, typeof origin, destination, id, typeof id, id === origin)
          
          if(!origin) { //if origin doesn't exist => make the clicked node origin
            this.onClickOrigin(id);
          } else if(origin && !destination && id != origin) { //if origin exist & destination doesn't exist and if the destination is not equal to origin
            this.onClickDestination(id);
          } else { //if both origin & destination exist ignore it
            console.log("Error! click proper origin & destination!!")
          }
        });
    }

  }

  createConnections() {
    let connectionContainer = d3.select(".connection-container");

    for(let id in intersectional_connection_data) {
      var connection = intersectional_connection_data[id];
      
      connectionContainer
      .append('line')
      .style("stroke", "black")
      .style("stroke-width", this.state.connection_size)
      .attr("x1", connection.c1_node.x + this.margin.left)
      .attr("y1", connection.c1_node.y + this.margin.top)
      .attr("x2", connection.c2_node.x + this.margin.left)
      .attr("y2", connection.c2_node.y + this.margin.top);
    }
  }

  onClickOrigin(id) {
    let node = intersectional_node_data[id]
    d3.select(".node-container")
      .append("circle")
      .attr("id", "node-origin")
      .attr("r", this.state.node_size * 2)
      .attr("cx", node.x + this.margin.left)
      .attr("cy", node.y + this.margin.top)
      .style("fill", "green")

    this.setState({
      origin: node
    });
  }

  onClickDestination(id) {
    let node = intersectional_node_data[id]
    d3.select(".node-container")
      .append("circle")
      .attr("id", "node-destination")
      .attr("r",  this.state.node_size * 2)
      .attr("cx", node.x + this.margin.left)
      .attr("cy", node.y + this.margin.top)
      .style("fill", "red")

    this.setState({
      destination: node
    });

    this.findShortestPath(id);
  }

  findShortestPath(id) { //find the shortest path for all algoritm
    let origin = this.state.origin;
    let pathNodes, startTime, endTime;
    let times = {}

    startTime = new Date().getTime();
    pathNodes = byDistance.shortest(origin.id, id, intersectional_node_data, intersectional_connection_data, this.gx);
    endTime = new Date().getTime();
    this.createPathNodes(pathNodes, "byDistance");   
    times.byDistanceTime = endTime - startTime;

    startTime = new Date().getTime();
    pathNodes = sloppyDijkstra.shortest(`${origin.id}`, `${id}`, intersectional_node_data, intersectional_connection_data, this.gx);
    endTime = new Date().getTime();
    this.createPathNodes(pathNodes, "sloppyDijkstra");
    times.sloppyDijkstraTime = endTime - startTime;
    
    startTime = new Date().getTime();
    pathNodes = dijkstra.shortest(`${origin.id}`, `${id}`, intersectional_node_data, intersectional_connection_data, this.gx);
    endTime = new Date().getTime();
    this.createPathNodes(pathNodes, "dijkstra");  
    times.dijkstraTime = endTime - startTime; 

    this.props.updatePerformance(times);

    // startTime = new Date().getTime();
    // pathNodes = bruteForce.shortest(origin.id, id, intersectional_node_data, intersectional_connection_data, this.gx);
    // endTime = new Date().getTime();
    // this.createPathNodes(pathNodes, "bruteForce");  
    // let bruteForceTime = endTime - startTime; 

    // this.props.updatePerformanceTimes({bruteForceTime: bruteForceTime});
  }

  createPathNodes(pathNodes, algorithm) {
    let pathContainer = d3.select(`.${algorithm}`)
      .append("g")
      .attr("class", "path-container");

    pathNodes.forEach((node) => {
      let id = node.id;
      pathContainer.append("circle")
        .attr("id", `path-node-${algorithm}-${node.id}`)
        .attr("node_id", id)
        .attr("class", "path-node")
        .attr("cx", node.x + this.margin.left)
        .attr("cy", node.y + this.margin.top)
        .attr("r",  this.state.node_size * 1.5)
      
      //for test purpose show node ids
      // pathContainer.append("text")
      //   .attr("id", `path-node-text-${algorithm}-${node.id}`)
      //   .text(id)
      //   .attr("x", node.x + this.margin.left)
      //   .attr("y", node.y + this.margin.top)
      //   .style("fill", "white")
      //   .style("font-size", "2px")
    })
  }

  getDistance(startID, endID) { //optimize later
    if(this.gx[startID][endID]) {
      return this.gx[startID][endID];
    } else if(this.gx[endID][startID]) {
      return this.gx[endID][startID];
    } else {
      console.log("connection NOT FOUND");
      return 0;
    }
  }

  checkPerformance() {
    let test, result;
    let overallTimes = {};
    let allPaths = {};
    console.log("checking Performance")
    //check time performance
    let id_list = Object.keys(intersectional_node_data);

    test = (originID, destinationID) => byDistance.shortest(originID, destinationID, intersectional_node_data, intersectional_connection_data, this.gx);
    result = performance.checkTime(test, id_list);
    overallTimes.overallByDistanceTime = result.time;
    allPaths.byDistance = result.paths;

    test = (originID, destinationID) => sloppyDijkstra.shortest(`${originID}`, `${destinationID}`, intersectional_node_data, intersectional_connection_data, this.gx);
    result = performance.checkTime(test, id_list);
    overallTimes.overallSloppyDijkstraTime = result.time;
    allPaths.sloppyDijkstra = result.paths;

    test = (originID, destinationID) => dijkstra.shortest(`${originID}`, `${destinationID}`, intersectional_node_data, intersectional_connection_data, this.gx);
    result = performance.checkTime(test, id_list);
    overallTimes.overallDijkstraTime = result.time;
    allPaths.dijkstra = result.paths;

    console.log("time done")
    this.props.stopPerformanceCheck(overallTimes);

    //check accuracy distance as standard
    let originId = id_list[0];
    let accuracies = {};
    let standardDistance = 0;
    for(let id of id_list) { //add all distance from origin to every node to compare with algorithm
      standardDistance += this.getDistance(originId, id);
    }

    for(let algorithm in allPaths) { //check every algorithm
      let paths = allPaths[algorithm][originId];
      let distance = 0;

      for(let destinationId in paths) { //check for every destination
        let path = paths[destinationId]
        path.forEach((node, i) => { //sum all weight to get ditance
          //skip first
          if(i === 0) return;

          let previous = path[i-1];
          distance += this.getDistance(previous.id, node.id);
        });
      }

      //compare the result with standard Distance
      accuracies[`${algorithm}Accuracy`] = 100 + Math.round((standardDistance - distance)/ standardDistance * 1000) / 10;

    }

    this.props.updatePerformance(accuracies)
  }

  render() {
    let current = this.props.current;

    if(this.props.checkingPerformance) this.checkPerformance();

    return (
      <svg id="svg-graph" className={isMobile ? "mobile" : "browser"}
        preserveAspectRatio="xMidYMid meet" ref={this.props.graphRef}>
        <g className="connection-container"/>
        <g className="node-container"/>
        <g className= {`bruteForce ${current === "bruteForce" ? "" : "hidden"}`}
          pointerEvents="none"/>
        <g className= {`dijkstra ${current === "dijkstra" ? "" : "hidden"}`}
          pointerEvents="none"/>
        <g className= {`sloppyDijkstra ${current === "sloppyDijkstra" ? "" : "hidden"}`}
          pointerEvents="none"/>
        <g className= {`byDistance ${current === "byDistance" ? "" : "hidden"}`}
          pointerEvents="none"/>
      </svg>
    )
  }
}
