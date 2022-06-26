let getShortestPath = (startID, destinationID, node_data, connections, path, distance, checked, shortestDistance, gx) => {
  let shortestPath = []; //start with origin node

  let connectedIds = []; //get all connected node
  connections = connections.filter((connection) => {
    if(connection.c1_id == startID) {
      if(!checked.includes(connection.c2_id)) connectedIds.push(connection.c2_id);  
      return 0;
    } else if(connection.c2_id == startID) {
      if(!checked.includes(connection.c1_id)) connectedIds.push(connection.c1_id);
      return 0;
    }
    return 1;
  });

  checked = checked.concat(connectedIds); //store all connectedIds as checked

  // console.log(connectedIds)
  for(let id of connectedIds) {
    let currentDistance = distance + gx[startID][id];
    
    //if currentDistance is longer than shorestDistance stop checking
    if(shortestDistance && currentDistance > shortestDistance) continue;

    if(id == destinationID) { //if destination is reach, add to path
      if(!shortestDistance || currentDistance < shortestDistance) {
        // console.log("path length", path.length)
        shortestDistance = currentDistance;
        shortestPath = [...path, node_data[id]];
      }
    } else {
      let result = getShortestPath(id, destinationID, node_data, connections, [...path, node_data[id]], currentDistance, checked, shortestDistance, gx);

      if(!result) continue; //if no possible path is found

      let possibleDistance = result.distance;
      if((!shortestDistance || (possibleDistance > 0 && possibleDistance < shortestDistance)
      )) { //if it's the first shortest path found or if it's shorter than shortest, set it as the shortest path
        shortestDistance = possibleDistance;
        shortestPath = result.path;
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
    return null
  }
}

export default {
  shortest: (originID, destinationID, intersectional_node_data, intersectional_connection_data, gx) => {
    let originalPath = [intersectional_node_data[originID]]
    let shortestDistance;
    let checked = [originID]; //nodes already checked

    let result = getShortestPath(originID, destinationID, intersectional_node_data, intersectional_connection_data, originalPath, 0, checked, shortestDistance, gx);

    if(!result) {
      console.log("Path NOT FOUND!!");
      return [];
    }

    return result.path;
  }
}