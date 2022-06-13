import nodes_between_intersections_data from '../sample_datas/nodes_between_two_intersectional_nodes';

module.exports = {
//Before getting the path using the algorithm
  getWayPoints: (origin, destination) => { 
    //query the waypoint data with waypoint ids

    //if there is interpositional nodes (not intersectional nodes)
      //get the intersectional node
    
    //add connection from waypoint to intersectional node (done in database to add all the weight to the connection)

  },


//After getting the path using the algorithm  
  //helper function: find the array of nodes between two intersections that node is located 
  getIntersectionalArrayOfNodes: (node) => {
    //if it's intersectional node

    //get intersectional nodes
    intersectionalNode1 = node.intersectional_node_1;
    intersectionalNode2 = node.intersectional_node_2;

    //get the object
    return nodes_between_intersections_data[`${intersectionalNode1}+${intersectionalNode2}`];
  },
  //helper function: give back array of node that to reach origin
  getNodeArrayToOrigin: (id, intersectionalNodeId, nodeArray) => {
    let index = array.indexOf(id);
    // return array[0] === intersectionalNodeId ? nodeArray.slice(0, index) : nodeArray(index);
  },
  //take in intersectionalPath and turn it into all node path array
  getAllNodesInPath: (intersectionalPath) => {
    let pathNodes = [];

    intersectionalPath.forEach((intersectionalPathNode, i) => {
      //add all nodes from one intersectional node to next
      let nodeArrayObject = getIntersectionalArrayOfNodes(intersectionalPathNode);

      if(i == 0) { //if it's origin
        let origin = intersectionalPathNode;
        let nextNode = intersectionalPath[1];

        pathNodes.append(getNeededNodeArray(origin, nextNode, nodeArrayObject));

      } else if(i == intersectionalPath.length() - 1) { //if it's destination
        let destination = intersectionalPathNode;
        let previousNode = intersectionalPath[-1];

        pathNodes.append(getNeededNodeArray(destination, previousNode, nodeArray));

        //add destination, because that's missing
        pathNodes.append(nodeArray)

      } else { //all other intersectional node
        pathNodes.concat(nodeArray);
      }
    });
    
    return pathNodes
  }
}