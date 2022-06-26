export default {
  checkTime: (testingFunction, id_list) => {
    let originId;
    let paths = {}
    
    let startTime = new Date().getTime();
    for(let destinationId of id_list) {
      //console.log("origin", originId, "destination", destinationId)
      if(!originId){//set first id as origin
        originId = destinationId;
        paths[originId] = {};
        continue;
      }
      paths[originId][destinationId] = testingFunction(originId, destinationId);
    }
    let endTime = new Date().getTime();
    return {
      time: endTime - startTime,
      paths: paths
    };
  }
}