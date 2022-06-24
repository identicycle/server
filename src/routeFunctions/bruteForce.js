module.exports = {
  
  shortest: (startID, endID, intersectional_node_data, intersectional_connection_data) => {
    let possiblePaths = [];

    //loop until destination is reached
    let found = false;
    while(!found) {
      
    }

    //find the shortest path
    let path;
    for(let possiblePath in possiblePaths) {
      if(possiblePath.length() < path.length()) path = possiblePath;
    }

    return path;
    
  }
}