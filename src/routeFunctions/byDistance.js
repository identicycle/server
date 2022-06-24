import { findClosestNode, getAllConnectedNodes } from './routeAlgorithmHelper';

export default { //get shortest path by choosing the closest node to the destination
  shortest: (originID, destinationID, intersectional_node_data, intersectional_connection_data, gx) => {
    let startID = originID;
    let path = [intersectional_node_data[originID]]; //start with origin node

    //loop until destination is reached
    let found = false;
    while(!found) {
      let connectedNodes = getAllConnectedNodes(startID, intersectional_connection_data);
      let closestNode = findClosestNode(destinationID, connectedNodes, gx);
      path.push(closestNode);

      if(closestNode.id == destinationID) { //if the destination is found
        found = true;
      } else { //if the destination is not found
        startID = closestNode.id;
      }
    }


    return path;
    
  }
}