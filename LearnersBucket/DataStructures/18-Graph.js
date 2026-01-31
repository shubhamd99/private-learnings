// Data structures are the building blocks of computer programming
// they are used to store the data in organized way and use it to implement algorithms (programs) while solving problems.

// In programming, (mathematically speaking ) a graph is a common data structure that consists
// of a finite set of nodes (or vertices) and edges.

// The edges connect the nodes (or vertices) to form a network
// it can be either uni-directional or bi-directional and
// may contain certain values which are the required cost to travel from one vertex to other

// Thing of vertex as a pair (x, y) where vertex x is connected to vertex y

// Imagine google maps, they are graphs, connecting one place to another
// They are also weighted graphs which helps us to decide the long and short routes (Distance to reach from SRC to DESTINATION)
// thanks to that you reach faster to destinations

// Or Imagine rail networks they are also giant graph,
// connecting cities with railways and tracks.
// Roadways are graph, ship routes, air routes, etc are all graphs.

// Your are surrounded by graphs, your facebook mutual friend recommendation is also done with the help of graphs.

// Degree of vertex: The total number of edges connected to a vertex. There are two types of degrees:
// In-Degree: The total number connected to a vertex.
// Out-Degree: The total of outgoing edges connected to a vertex.

// Adjacency: Two vertices are said to be adjacent if there is an edge connecting them directly.

// Parallel Edges: Two undirected edges are parallel​ if they have the same end vertices.
// Two directed edges are parallel if they have the same origin and destination.

// Self Loop: This occurs when an edge starts and ends on the same vertex.

// Isolated vertex: A vertex with zero degree, meaning it is not an endpoint of an edge.

// The implementation below will be based on the Adjacency List representation.
// As we know, the Graph class consists of two data members:
// The total number of vertices in the graph
// A map of arrays to store adjacent vertices

// We can also use an array of linked list to represent the graph but it has limitations,
// in this the vertices and edges has to be numeric always
//  also removing the vertices from it takes (V + E)
// because after removing any entry we have to re-index the array.

// Using hashmap with linkedlist or array is much better because we can use either number or character as the vertices or edges
// also delete operation takes O(E) time, where E is the no of edges.

// Following is the list of operations we are going to perform.
// Graph class: Creates graph with given nodes.
// Add: adds a new node to the graph.
// Print: prints the graph.
// Remove: removes the node.

// Adjacency List
// Adjacency List, a map of arrays is used to store edges between two vertices,
// The size of the map is equal to the number of vertices
// Each key in this map represents a specific vertex in the graph.
// If a new vertex is added to the graph, it is simply added to the map as well.

// Un-weighted graph
// Directed graph
class Edge {
  constructor(src, dest) {
    this.src = src;
    this.dest = dest;
  }
}

class Graph {
  constructor(edges) {
    this.edges = edges;
    // A list of lists to represent an adjacency list
    this.adj = new Map();

    // add edges to the directed graph
    for (let current of this.edges) {
      // allocate new node in adjacency list from src to dest
      const { src, dest } = current;
      if (this.adj.has(src)) {
        this.adj.get(src).push(dest);
      } else {
        this.adj.set(src, [dest]);
      }
    }
  }

  add(edge) {
    const { src, dest } = edge;
    if (this.adj.has(src)) {
      this.adj.get(src).push(dest);
    } else {
      this.adj.set(src, [dest]);
    }
  }

  remove(edge) {
    const { src, dest } = edge;
    let srcList = this.adj.get(src);
    srcList = srcList.filter((e) => e !== dest);

    if (srcList.length === 0) {
      this.adj.delete(src);
    } else {
      this.adj.set(src, srcList);
    }

    return true;
  }

  print() {
    for (let src of this.adj.keys()) {
      // print current vertex and all its neighboring vertices
      let str = "";
      for (let dest of this.adj.get(src)) {
        str += "(" + src + " ——> " + dest + ")";
      }
      console.log(str);
    }
  }

  // Return graph
  getList = () => this.adj;
}

const arr = [
  new Edge(0, 1),
  new Edge(1, 2),
  new Edge(2, 0),
  new Edge(2, 1),
  new Edge(3, 2),
  new Edge(4, 5),
  new Edge(5, 4),
];

const graph = new Graph(arr);
graph.add(new Edge("c", "d"));
graph.print();

// Output:
// "(0 ——> 1)"
// "(1 ——> 2)"
// "(2 ——> 0)(2 ——> 1)"
// "(3 ——> 2)"
// "(4 ——> 5)"
// "(5 ——> 4)"
// "(c ——> d)"

// Undirected graph
// As we now that in undirected graph we go from src to destination and vice versa,
// we can do the same in the implementation.

class Graph2 {
  constructor(edges) {
    this.edges = edges;
    // A list of lists to represent an adjacency list
    this.adj = new Map();

    // add edges to the directed graph
    for (let current of this.edges) {
      // allocate new node in adjacency list from src to dest
      const { src, dest } = current;
      if (this.adj.has(src)) {
        this.adj.get(src).push(dest);
      } else {
        this.adj.set(src, [dest]);
      }

      // uncomment next lines for undirected graph
      // allocate new node in adjacency list from dest to src
      if (this.adj.has(dest)) {
        this.adj.get(dest).push(src);
      } else {
        this.adj.set(dest, [src]);
      }
    }
  }

  add(edge) {
    const { src, dest } = edge;
    if (this.adj.has(src)) {
      this.adj.get(src).push(dest);
    } else {
      this.adj.set(src, [dest]);
    }

    // uncomment next lines for undirected graph
    // allocate new node in adjacency list from dest to src
    if (this.adj.has(dest)) {
      this.adj.get(dest).push(src);
    } else {
      this.adj.set(dest, [src]);
    }
  }

  remove(edge) {
    const { src, dest } = edge;
    let srcList = this.adj.get(src);
    srcList = srcList.filter((e) => e !== dest);

    if (srcList.length === 0) {
      this.adj.delete(src);
    } else {
      this.adj.set(src, srcList);
    }

    // uncomment next lines for undirected graph
    let destList = this.adj.get(dest);
    destList = destList.filter((e) => e !== src);

    if (destList.length === 0) {
      this.adj.delete(dest);
    } else {
      this.adj.set(dest, destList);
    }

    return true;
  }

  print() {
    for (let src of this.adj.keys()) {
      // print current vertex and all its neighboring vertices
      let str = "";
      for (let dest of this.adj.get(src)) {
        str += "(" + src + " ——> " + dest + ")";
      }
      console.log(str);
    }
  }

  // Return graph
  getList = () => this.adj;
}

const arr2 = [
  new Edge(0, 1),
  new Edge(2, 0),
  new Edge(2, 1),
  new Edge(3, 2),
  new Edge(4, 5),
  new Edge(5, 4),
];

console.log("---------------------------------");
const graph2 = new Graph2(arr2);
graph2.add(new Edge("c", "d"));
graph2.print();

// Output:
// "(0 ——> 1)(0 ——> 2)"
// "(1 ——> 0)(1 ——> 2)"
// "(2 ——> 0)(2 ——> 1)(2 ——> 3)"
// "(3 ——> 2)"
// "(4 ——> 5)(4 ——> 5)"
// "(5 ——> 4)(5 ——> 4)"
// "(c ——> d)"
// "(d ——> c)"

// Weighted graph data structure in Javascript
// Un-directed and directed combined.
class WeightEdge {
  constructor(src, dest, weight) {
    this.src = src;
    this.dest = dest;
    this.weight = weight;
  }
}

class Node {
  constructor(value, weight) {
    this.value = value;
    this.weight = weight;
  }

  toString() {
    return this.value + " (" + this.weight + ")";
  }
}

class WeightGraph {
  constructor(edges) {
    this.edges = edges;
    // A list of lists to represent an adjacency list
    this.adj = new Map();

    // add edges to the directed graph
    for (let current of this.edges) {
      // allocate new node in adjacency list from src to dest
      const { src, dest, weight } = current;
      if (this.adj.has(src)) {
        this.adj.get(src).push(new Node(dest, weight));
      } else {
        this.adj.set(src, [new Node(dest, weight)]);
      }
    }
  }

  add(edge) {
    const { src, dest, weight } = edge;
    if (this.adj.has(src)) {
      this.adj.get(src).push(new Node(dest, weight));
    } else {
      this.adj.set(src, [new Node(dest, weight)]);
    }
  }

  remove(edge) {
    const { src, dest } = edge;
    let srcList = this.adj.get(src);
    srcList = srcList.filter((e) => e !== dest);

    if (srcList.length === 0) {
      this.adj.delete(src);
    } else {
      this.adj.set(src, srcList);
    }

    return true;
  }

  print() {
    for (let src of this.adj.keys()) {
      // print current vertex and all its neighboring vertices
      let str = "";
      for (let dest of this.adj.get(src)) {
        str += "(" + src + " ——> " + dest + ")";
      }
      console.log(str);
    }
  }

  // Return graph
  getList = () => this.adj;
}

const arr3 = [
  new WeightEdge(0, 1, 6),
  new WeightEdge(1, 2, 7),
  new WeightEdge(2, 0, 5),
  new WeightEdge(2, 1, 4),
  new WeightEdge(3, 2, 10),
  new WeightEdge(4, 5, 1),
  new WeightEdge(5, 4, 3),
];

console.log("---------------------------------");

const weightGraph = new WeightGraph(arr3);
weightGraph.add(new WeightEdge("a", "b", 122));
weightGraph.print();

// Output:
// "(0 ——> 1 (6))"
// "(1 ——> 2 (7))"
// "(2 ——> 0 (5))(2 ——> 1 (4))"
// "(3 ——> 2 (10))"
// "(4 ——> 5 (1))"
// "(5 ——> 4 (3))"
// "(a ——> b (122))"

// Insert - O(1)
// Seacrh - O(E)
// Delete - O(E)
// Space - O (V + E)
