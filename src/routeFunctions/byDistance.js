import { findClosestNode, getAllConnectedNodes } from './routeAlgorithmHelper';

export default { //get shortest path by choosing the closest node to the destination
  shortest: (originID, destinationID, intersectional_node_data, intersectional_connection_data, gx) => {
    let startID = originID;
    let path = [intersectional_node_data[originID]]; //start with origin node
    let connections = [ ...intersectional_connection_data ]; //copy node object

    //loop until destination is reached
    let found = false;
    while(!found) {
      let { newConnections, connectedNodes } = getAllConnectedNodes(startID, connections);
      connections = newConnections; //delete all connections to the node from conections
      let closestNode = findClosestNode(destinationID, connectedNodes, gx);
      path.push(closestNode);

      if(!connectedNodes.length) {
        console.log("PATH NOT FOUND!!")
        return [];
      }

      if(closestNode.id == destinationID) { //if the destination is found
        found = true;
      } else { //if the destination is not found
        startID = closestNode.id;
      }
    }


    return path;
    
  }
}