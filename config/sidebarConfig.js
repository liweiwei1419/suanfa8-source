const index = require('./sidebar/index.js');
// const sort = require('./sidebar/sort.js');
const binarySearch = require('./sidebar/binary-search.js');

const slidingWindow = require('./sidebar/sliding-window.js');
const twoPointers = require('./sidebar/two-pointers.js');
const backtracking = require('./sidebar/backtracking.js');

// const breadthFirstSearch = require('./sidebar/breadth-first-search.js');
// const hashTable = require('./sidebar/hash-table.js');
// const greedy = require('./sidebar/greedy.js');
// const heap = require('./sidebar/heap.js');

module.exports = {
	// "/sort/": sort,
	"/binary-search/": binarySearch,
	"/sliding-window/": slidingWindow,
	"/two-pointers/": twoPointers,
	"/backtracking/": backtracking,
	// "/quick-sort/": quickSort,

	// 
	// "/breadth-first-search/": breadthFirstSearch,
	// "/hash-table/": hashTable,
	// "/greedy/": greedy,
	// "/heap/": heap,
	"/": index
}