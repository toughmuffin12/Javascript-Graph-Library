import Graph from './graph-library.js'

//Creates new Graph 'g'.
var g = new Graph(0);

//Adds verticies 'a'- 'f'.
var verticies = ['a', 'b', 'c', 'd', 'e', 'f']
for (var i = 0; i < verticies.length; i++) {
   g.addVertex(verticies[i]);
}

//addUndirectedEdge and addDirectedEdge Test
g.addUndirectedEdge('a', 'b');
g.addUndirectedEdge('b', 'c');
g.addDirectedEdge('a', 'e');
g.addDirectedEdge('c', 'd');
g.addUndirectedEdge('d', 'e');
g.addDirectedEdge('c', 'e')
g.addUndirectedEdge('e', 'f');

//printGraph Test
console.log("Adjacency List of Unweighted Graph:")
g.printGraph();
console.log("\n")

//BFS Test
console.log("Breadth First Search from node 'a':")
g.BFS('a')
console.log("\n")

//DFS Test
console.log("Deapth First Search from node 'a':")
g.DFS('a');
console.log("\n")

//Creates a weighted graph 'wg'.
var wg = new Graph(0);

//Adds verticies 'a'- 'f'.
var verticies = ['a', 'b', 'c', 'd', 'e', 'f']
for (var i = 0; i < verticies.length; i++) {
   wg.addVertex(verticies[i]);
}

//addWeightedUndirected and addWeightedDirected Test
wg.addWeightedUndirectedEdge('a', 'b', 2);
wg.addWeightedUndirectedEdge('b', 'c', 5);
wg.addWeightedDirectedEdge('a', 'e', 10);
wg.addWeightedDirectedEdge('c', 'd', 8);
wg.addWeightedUndirectedEdge('d', 'e', 1);
wg.addWeightedDirectedEdge('c', 'e', 25)
wg.addWeightedUndirectedEdge('e', 'f', 35);

//printWeightGraph Test
console.log("Adjacency List of Weighted Graph:")
wg.printWeightedGraph();
console.log("\n")

//ShortestPath Test
console.log("Shortest Path between Two Points and the Weight of that path:")
wg.ShortestPath('b', 'f');

