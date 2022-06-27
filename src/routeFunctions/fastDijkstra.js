//Checkes routes for the next smallest node not checked
function smallestShort(routes, checked) {
    var output = '-1';
    for (let id in routes) {
        if (!checked.includes(id) && (output == '-1' || routes[id].short+routes[id].gx < routes[output].short+routes[output].gx)) {
            output = id;
        }
    }
    return output
}

//Finds shortest route
function shortestRoute(startID, endID, ind, icd, gx) {
    const bigNum = 4294967295; //Arbitrarily large number
    var routes = {}; //Stores the shortest route to each node found so far
    var checked = [startID]; //Stores all nodes already checked for routes

    //Populates routes object by setting all the shortests routes as very large except the starting route
    for (let id in ind) {
        routes[id] = {
            short: ((id != startID) ? bigNum : 0), 
            from: startID,
            gx: gx[id][endID] // precalculated 
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
                routes[j].short = connected[i].weight + routes[next].short;
                routes[j].from = next;
            }
        }

        //Defines next as the next shortest
        next = smallestShort(routes, checked, ind, endID);
        checked.push(next);
    }

    //Turns routes object into array of routes from start to end
    var finalRoute = [];
    finalRoute.unshift(ind[endID]);
    while (finalRoute[0].id != startID) {
        finalRoute.unshift(ind[routes[finalRoute[0].id].from]);
    }
    return finalRoute;
}
// printRoute(shortestRoute('1', '900', ind, icd))

module.exports = {
    shortest: shortestRoute
}