const index = require('./sidebar/index.js');
const binarySearch = require('./sidebar/binary-search/binary-search.js');
const slidingWindow = require('./sidebar/sliding-window/sliding-window.js');
const twoPointers = require('./sidebar/two-pointers/two-pointers.js');

const mergeSort = require('./sidebar/merge-sort/merge-sort.js');
const quickSort = require('./sidebar/quick-sort/quick-sort.js');

const dynamicProgramming = require('./sidebar/dynamic-programming/dynamic-programming.js');
const unionFind = require('./sidebar/union-find/union-find.js');
const choice = require('./sidebar/choice/choice.js');
const heap = require('./sidebar/heap/heap.js');
const graph = require('./sidebar/graph/graph.js');


const backtracking = require('./sidebar/backtracking/backtracking.js');


const presumHashtable = require('./sidebar/presum-hashtable/presum-hashtable.js');

const linkedList = require('./sidebar/linked-list/linked-list.js');
const loopInvariant = require('./sidebar/loop-invariant/loop-invariant.js');
const chat = require('./sidebar/chat/chat.js');

module.exports = {
	"/choice/": choice,
	"/binary-search/": binarySearch,
	"/sliding-window/": slidingWindow,
	"/two-pointers/": twoPointers,

	"/merge-sort/": mergeSort,
	"/quick-sort/": quickSort,

	"/dynamic-programming/": dynamicProgramming,
	"/union-find/": unionFind,
	"/heap/": heap,
	"/graph/": graph,
	
	"/linked-list/": linkedList,
	"/presum-hashtable/": presumHashtable,


	"/loop-invariant/": loopInvariant,
	"/backtracking/": backtracking,
	"/chat/": chat,
	"/": index
}