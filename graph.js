class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {

    this.nodes.add(vertex);

  };

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {

    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    };
  };

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  };

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  };

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // let adjacentList = vertex.adjacent.values();
    for (let neighbor in vertex.adjacent) {
      this.removeEdge(neighbor, vertex);
    };

    this.nodes.delete(vertex);
  };

  // this function returns an array of Node values using DFS
  xdepthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let nodeArr = [];

    while (toVisitStack.length > 0) {
      let currNode = toVisitStack.pop();
      nodeArr.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodeArr;

  }

  depthFirstSearch(node) {
    let seen = new Set();
    let nodeArr = [];

    function _depthFirstSearchHelper(node, seen, nodeArr) {
      seen.add(node);
      nodeArr.push(node.value);
      for (let neighbor of node.adjacent) {
        if (!seen.has(neighbor)) {
          _depthFirstSearchHelper(neighbor, seen, nodeArr)
        }
      }
    }

    _depthFirstSearchHelper(node, seen, nodeArr);

    return nodeArr;
  }


  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {

    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let nodeArr = [];

    while (toVisitStack.length) {
      let currNode = toVisitStack.shift();
      nodeArr.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return nodeArr;
  }
}

module.exports = { Graph, Node }