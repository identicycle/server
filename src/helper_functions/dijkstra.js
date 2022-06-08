const ind = require('../sample_datas/ind');
const icd = require('../sample_datas/icd');

//Adds weights to each connection. For now, purely based on distance
function fixICD() {
    for (let id in icd) {
        let xDist = icd[id].c1_node.x - icd[id].c2_node.x
        let yDist = icd[id].c1_node.y - icd[id].c2_node.y
        icd[id].weight = Math.sqrt(xDist*xDist + yDist*yDist)
    }
}

//Checkes routes for the next smallest node not checked
function smallestShort(routes, checked) {
    var output = '-1';
    for (let id in routes) {
        if (!checked.includes(id) && (output == '-1' || routes[id].short < routes[output].short)) {
            output = id;
        }
    }
    return output
}


//Finds shortest route
function shortestRoute(startID, endID) {
    const bigNum = 99999999; //Arbitrarily large number
    var routes = {}; //Stores the shortest route to each node found so far
    var checked = [startID]; //Stores all nodes already checked for routes

    //Populates routes object by setting all the shortests routes as very large except the starting route
    for (let id in ind) {
        routes[id] = {
            short: ((id != startID) ? bigNum : 0), 
            from: startID
        };
    }

    var next = startID
    //Loops until we hit the final node. Checks all nodes before then
    while (next != endID) {

        //Defines connected as all connections connected to the node being currently checked
        let connected = []
        for (let i in icd) {
            if (icd[i].c1_id == next || icd[i].c2_id == next) {
                connected.push({
                    weight : icd[i].weight, 
                    to : ((icd[i].c2_id==next)?icd[i].c1_id:icd[i].c2_id)
                })
            }
        }

        //Uses new connections to find new shortest routes
        for (let i in connected) {
            let j = connected[i].to
            if (connected[i].weight + routes[next].short < routes[j].short) {
                routes[j].short = connected[i].weight + routes[next].short
                routes[j].from = next
            }
        }

        //Defines next as the next shortest
        next = smallestShort(routes, checked)
        checked.push(next)
    }

    //Turns routes object into array of routes from start to end
    var finalRoute = []
    finalRoute.unshift(ind[endID])
    while (finalRoute[0].id != startID) {
        //console.log(finalRoute[0].id)
        finalRoute.unshift(ind[routes[finalRoute[0].id].from])
    }
    return finalRoute
}

function allShortest(startID) {
    const bigNum = 99999999; //Arbitrarily large number
    var routes = {}; //Stores the shortest route to each node found so far
    var checked = [startID]; //Stores all nodes already checked for routes

    //Populates routes object by setting all the shortests routes as very large except the starting route
    for (let id in ind) {
        routes[id] = {
            short: ((id != startID) ? bigNum : 0), 
            from: startID
        };
    }

    var next = startID
    //Loops until we hit the final node. Checks all nodes before then
    while (next != '-1') {

        //Defines connected as all connections connected to the node being currently checked
        let connected = []
        for (let i in icd) {
            if (icd[i].c1_id == next || icd[i].c2_id == next) {
                connected.push({
                    weight : icd[i].weight, 
                    to : ((icd[i].c2_id==next)?icd[i].c1_id:icd[i].c2_id)
                })
            }
        }

        //Uses new connections to find new shortest routes
        for (let i in connected) {
            let j = connected[i].to
            if (connected[i].weight + routes[next].short < routes[j].short) {
                routes[j].short = connected[i].weight + routes[next].short
                routes[j].from = next
            }
        }

        //Defines next as the next shortest
        next = smallestShort(routes, checked)
        checked.push(next)
    }

    //Turns routes object into array of routes from start to ends
    var output = {}
    for (let endID in ind) {
        let finalRoute = []
        finalRoute.unshift(ind[endID])
        while (finalRoute[0].id != startID) {
            //console.log(finalRoute[0].id)
            finalRoute.unshift(ind[routes[finalRoute[0].id].from])
        }
        output[endID] = finalRoute
    }
    return output
}

// function printRoute(route) {
//     console.log("Answer")
//     for (let node in route) {
//         console.log(route[node].id)
//     }
// }

//printRoute(shortestRoute('0','899'))

module.exports = {
    shortest: shortestRoute
}