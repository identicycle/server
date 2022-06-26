import { getAllConnectedNodes } from './routeAlgorithmHelper';

let getShortestPath = (startID, originID, destinationID, connections, path, distance, gx) => {
  // console.log("recursive", startID)
  let shortestDistance;
  let shortestPath = []; //start with origin node

  let {connectedNodes, newConnections} = getAllConnectedNodes(startID, connections);

  for(let node of connectedNodes) {
    let id = node.id;

    //check if the node is already in path
    let repeat = path.find((n) => n.id == id);

    if (repeat) { //if it's repeat terminate
      continue;
    } else if(id == destinationID) { //if destination is reach, add to path
      let currentDistance = distance + gx[startID][id];
      if(!shortestDistance || currentDistance < shortestDistance) {
        shortestDistance = currentDistance;
        shortestPath = [...path, node];
      }
    } else {
      let currentDistance = distance + gx[startID][id];
      let result = getShortestPath(id, originID, destinationID, newConnections, [...path, node], currentDistance, gx);
      let possibleDistance = result.distance;
      if((!shortestDistance || (possibleDistance > 0 && possibleDistance < shortestDistance)
      )) {
        shortestDistance = possibleDistance;
        shortestPath = [ ...path, ...result.path];
      }
      continue;
    }
  };

  if(shortestDistance) {
    return {
      distance: shortestDistance,
      path: shortestPath
    }
  } else {
    return {
      distance: -1,
      path: []
    }
  }
}

export default {
  shortest: (originID, destinationID, intersectional_node_data, intersectional_connection_data, gx) => {

    let { distance, path } = getShortestPath(originID, originID, destinationID, intersectional_connection_data, [intersectional_node_data[originID]], 0, gx)

    return path;
    
  }
}