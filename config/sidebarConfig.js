const index = require('./sidebar/index.js');
const binarySearch = require('./sidebar/binary-search/binary-search.js');
const dynamicProgramming = require('./sidebar/dynamic-programming/dynamic-programming.js');
const unionFind = require('./sidebar/union-find/union-find.js');
const choice = require('./sidebar/choice/choice.js');
const heap = require('./sidebar/heap/heap.js');
const graph = require('./sidebar/graph/graph.js');
const mergeSort = require('./sidebar/merge-sort/merge-sort.js');
const quickSort = require('./sidebar/quick-sort/quick-sort.js');

const backtracking = require('./sidebar/backtracking/backtracking.js');

const linkedList = require('./sidebar/linked-list/linked-list.js');
const loopInvariant = require('./sidebar/loop-invariant/loop-invariant.js');
const chat = require('./sidebar/chat/chat.js');

module.exports = {
	"/choice/": choice,
	"/binary-search/": binarySearch,
	"/dynamic-programming/": dynamicProgramming,
	"/union-find/": unionFind,
	"/heap/": heap,
	"/graph/": graph,
	"/merge-sort/": mergeSort,
	"/quick-sort/": quickSort,
	"/linked-list/": linkedList,
	"/loop-invariant/": loopInvariant,
	"/backtracking/": backtracking,
	"/chat/": chat,
	"/": index
}