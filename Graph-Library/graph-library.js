export default class Graph {
    constructor(numOfVertices) {
       this.numOfVertices = numOfVertices;
       this.adjacencyList = new Map();
       this.verticies = []
    }

    //Adds Vertex to Graph.
    addVertex(v) {
       this.adjacencyList.set(v, []);
       this.numOfVertices++;
       this.verticies.push(v);
    }

    //Adds undirected edge between v and w.
    addUndirectedEdge(v, w) {
        this.adjacencyList.get(v).push(w);
        this.adjacencyList.get(w).push(v);
     }

     //Adds directed edge between v and w.
    addDirectedEdge(v, w) {
        this.adjacencyList.get(v).push(w);
     }

    //Adds undirected edge between v and w and the weight of that edge.
    addWeightedUndirectedEdge(v, w, weight) {
       this.adjacencyList.get(v).push({node: w, weight});
       this.adjacencyList.get(w).push({node: v, weight});
    }

    //Adds directed edge between v and w and the weight of that edge.
    addWeightedDirectedEdge(v, w, weight) {
       this.adjacencyList.get(v).push({node: w, weight});
    }

    //Prints nodes and ajacency lists.
    printGraph() {
       var keys = this.adjacencyList.keys();
       for(var i of keys) {
           var nodes = this.adjacencyList.get(i);
           var list = "";

           for (var j of nodes) {
               list += j + " ";
           }
           console.log(i + "->" + list);
       }
    }

    //Prints nodes, ajacency lists, and weights of edges.
    printWeightedGraph() {
        var keys = this.adjacencyList.keys();
        for(var i of keys) {
            var nodes = this.adjacencyList.get(i);
            var list = "";
 
            for (var j of nodes) {
                list += JSON.stringify(j) + " ";
            }
            console.log(i + "->" + list);
        }
     }

    //Breadth First Search
    //Queue to keep track of unexplored verticies and a set of explored verticies.
    //Prints current vertex and then queues all unexplored neighbors.
    BFS(start) {
        var q = new Queue();
        let explored = new Set();
        q.enqueue(start);
        explored.add(start);

        while (!q.isEmpty() == true) {
            let node = q.dequeue();
            console.log(node);
            var neighborsList = this.adjacencyList.get(node);

            for (var i in neighborsList) {
                var currentNeighbor = neighborsList[i];
                if (!explored.has(currentNeighbor)) {
                    explored.add(currentNeighbor);
                    q.enqueue(currentNeighbor);
                }

            }
        }
        if (explored.size == this.numOfVertices) {
            console.log("All nodes have been visited!");
        }
    }

    //Deapth First Search
    //Stores explored nodes as an array and calls DFS recursively.
    DFS(start) {
        var explored = [];
        this.DFSRecursive(start, explored);
        if (explored.length == this.numOfVertices) {
            console.log("All nodes have been visited!");
        }
    }
    //Passed a vertex and an already explored array. Adds vertex parameter to the explored
    //vertex array and prints vertex.
    //Gets adjacency list of vertex and for all unexplored nodes in adjacency list
    //recursivly calls itself.
    DFSRecursive(vertex, explored) {
        explored.push(vertex);
        console.log(vertex);

        var neighborsList = this.adjacencyList.get(vertex);
        for (var i in neighborsList) {
            var currentNeighbor = neighborsList[i];
            if(!explored.includes(currentNeighbor)) {
                this.DFSRecursive (currentNeighbor, explored);
            }
        }
    }

    //Dikstras Shortest Path
    //Checks smallest accesible neighbor of current node and updates all nodes conneted
    //to this smallest neighbor.
    //Once it visits all nodes, it travels backwards from end and adds elements to an array
    //to print results of shortest path from start to end.
    ShortestPath (start, end) {
        let weights = {};
        let prevNodes = {};
        let pq = new PriorityQueue();

        weights[start] = 0;
        pq.enqueue([start, 0]);

        this.verticies.forEach(element => {
            if(element != start) {
                weights[element] = Infinity;
                prevNodes = null || {};
            }
        });

        while (!pq.isEmpty()) {
            let closestNode = pq.dequeue();
            let currentNode = closestNode[0];
            this.adjacencyList.get(currentNode).forEach(neighbor => {
                let weight = weights[currentNode] + neighbor.weight;
                if(weight < weights[neighbor.node]) {
                    weights[neighbor.node] = weight;
                    prevNodes[neighbor.node] = currentNode;
                    pq.enqueue([neighbor.node, weight])
                } 
            }); 
        }
        let pathTraveled = [end];
        let lastNode = end;

        while(lastNode != start) {
            pathTraveled.unshift(prevNodes[lastNode])
            lastNode = prevNodes[lastNode]
        }
        console.log("Path traveled is " + pathTraveled);
        console.log("Total Weight of path is " + weights[end]);
    }
}

//Queue Class
class Queue {
    constructor () {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    //Adds element to the end of the queue.
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    //Removes and returns element in 0th index and moves everything up 1 index.
    //If queue is empty, returns error.
    dequeue() {
        if (this.isEmpty()) {
            return "Error";
        }
        else {
            const retVal = this.elements[this.head];
            delete this.elements[this.head];
            this.head++;
            return retVal;
        }
    }
    //Returns the length of the queue.
    get length() {
        return this.tail - this.head;
    }
    //Returns if the queue is empty or not.
    isEmpty() {
        if (this.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

//Priority Queue Class
class PriorityQueue {
    constructor () {
        this.objects = [];
    }
    //Queues the element to index 0 if the PQ is empty.
    //Otherwise it iterates through the PQ until it finds a priority larger than that of
    //element. 
    //If it does not find a priority larger than element, it adds element to the end.
    enqueue (element) {
        if (this.isEmpty()) {
            this.objects.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.objects.length; i++) {
                if (element[1] < this.objects.length[i-1]) {
                    this.objects.splice(i-1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.objects.push(element); 
            }
        }
    }
    //Removes and returns element in 0 index and moves everything up 1 index.
    //If queue is empty, returns error.
    dequeue () {
        if (this.isEmpty()) {
            return "Error";
        }
        else {
            let value = this.objects.shift();
            return value;
        }
    }
    //Returns if the PQ is empty or not.
    isEmpty() {
        if (this.objects.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
