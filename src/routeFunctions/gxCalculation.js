function gxCalculator(nodeSet) {
    const stairWeight = 3000;
    const doorWeight = 5000;
    let output = {};
    for (let sode in nodeSet) { //sode = start node
        output[sode] = {};
        for (let enode in nodeSet) { //enode = end node
            let sVal = nodeSet[sode];
            let eVal = nodeSet[enode];
            let minDoors = doorWeight*((sVal.building === eVal.building) ? 0 : ((sVal.building === 0 || eVal.building === 0) ? 1:2));
            output[sode][enode] = math.sqrt(Math.pow(sVal.x - eVal.x, 2) + 
                                            Math.pow(sVal.y - eVal.y, 2) + 
                                            Math.pow(stairWeight*(sVal.floor - eVal.floor), 2) + 
                                            Math.pow(minDoors, 2));

        }
    }
    return output;
}