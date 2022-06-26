export default {
  checkTime: (testingFunction, id_list) => {
    let originId = id_list[0];
    let startTime = new Date().getTime();
    for(let destinationId of id_list.slice(1)) {
      testingFunction(originId, destinationId);
    }
    let endTime = new Date().getTime();
    return endTime - startTime;
  }
}