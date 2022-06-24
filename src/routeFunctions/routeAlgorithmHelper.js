module.exports = {
  //for byDistance algorithm, find the closest node to given nodeID from the array of nodes
  findClosestNode: (nodeID, nodes, gx) => {
    let closestNode;
    let closestDistance;
    nodes.forEach((node) => {
      let distance = gx[nodeID][node.id];
      if(!closestNode || distance < closestDistance) {
        closestDistance = distance;
        closestNode = node;
      }
    });
    return closestNode;
  },
  //for byDistance algorithm, find all nodes connected to given nodeID
  getAllConnectedNodes: (nodeID, connections) => {
    let connectedNodes = [];
    connections.forEach((connection) => {
      if(connection.c1_id == nodeID) {
        connectedNodes.push(connection.c2_node);
      } else if(connection.c2_id == nodeID) {
        connectedNodes.push(connection.c1_node);
      }
    });
    
    return connectedNodes;
  }
}