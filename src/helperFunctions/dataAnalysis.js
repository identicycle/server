module.exports = {
  //find the highest and lowest value of x from the node data
  //output: [highest, lowest]
  findHighestLowestX: (node_data) => {
    let property = Object.keys(node_data)[0];
    let highest = node_data[property].x;
    let lowest = node_data[property].x;

    for(let id in node_data) {
      let x = node_data[id].x;
      if(x > highest) {
        highest = x;
      }
      if(x < lowest) {
        lowest = x;
      }
    }

    return [highest, lowest];
  },
  findHighestLowestY: (node_data) => {
    let property = Object.keys(node_data)[0];
    let highest = node_data[property].y;
    let lowest = node_data[property].y;

    for(let id in node_data) {
      let y = node_data[id].y;
      if(y > highest) {
        highest = y;
      }
      if(y < lowest) {
        lowest = y;
      }
    }

    return [highest, lowest];
  }
}