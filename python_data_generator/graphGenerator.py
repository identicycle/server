import random

def adj(i, size):
    output = [i-1, i+1, i+size, i-size]
    if i % size == 0:
        output.remove(i-1)
    if i % size == size-1:
        output.remove(i+1)
    for i in output:
        if i < 0 or i > size*size-1:
            output.remove(i)
    return output

def generate(size = 100):
    corners = [0, size-1, size**2-1, size*(size-1)]
    nodes = []
    for i in range(size):
        for j in range(size):
            nodes.append([i*size+j, i*10, j*10])

    edges = []
    for node in nodes:
        if node[0] in corners:
            nodeAdj = adj(node[0], size)
            already = 0
            for i in edges:
                if node[0] in i[0:2]:
                    already += 1
            if already == 0:
                nextNode = random.choice(nodeAdj)
                edges.append([node[0], nextNode, 10])
        else:
            nodeAdj = adj(node[0], size)
            already = []
            for i in edges:
                if node[0] == i[0]:
                    already.append(i[1])
                elif node[0] == i[1]:
                    already.append(i[0])
            for i in nodeAdj:
                if i in already:
                    nodeAdj.remove(i)
            for i in range(max(0, 3-len(already))):
                edges.append([node[0], random.choice(nodeAdj), 10])
                nodeAdj.remove(edges[-1][1])
    return [nodes, edges]

def getAllConnections(data, idd):
    output = []
    for edge in data[1]:
        if idd in edge[0:2]:
            output.append(edge)
    return output

def nodeGen(idd, node):
    return '{id:'+str(node[idd][0]+1)+", x:"+str(node[idd][1])+', y:'+str(node[idd][2])+"}"

def makeFile(data):
    with open("./src/sample_data/ind.js", 'w+') as f:
        f.write("module.exports = {\n")
        length = len(data[0])
        for i in range(length):
            idd = str(data[0][i][0]+1)
            x = str(data[0][i][1])
            y = str(data[0][i][2])
            f.write(idd + ": {id:"+idd+", x:"+x+", y:"+y+"}")
            if i != length-1:
                f.write(',')
            f.write('\n')
        f.write('}')
    with open("./src/sample_data/icd.js", 'w+') as f:
        f.write("module.exports = [\n")
        length = len(data[1])
        idx = 1
        for i in range(length):
            c1 = data[1][i][0]
            c2 = data[1][i][1]
            w = str(data[1][i][2])
            f.write('{c1_id: '+str(c1+1)+', c2_id: '+str(c2+1)+', c1_node: '+nodeGen(c1, data[0])+', c2_node: '+nodeGen(c2, data[0])+', weight:'+w+'}')
            if i != length-1:
                f.write(',')
            f.write('\n')
            idx+=1
        f.write(']')
makeFile(generate(12))
            
