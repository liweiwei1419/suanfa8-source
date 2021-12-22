const index = require('./sidebar/index.js');
const binarySearch = require('./sidebar/binary-search/binary-search.js');
const dynamicProgramming = require('./sidebar/dynamic-programming/dynamic-programming.js');
const unionFind = require('./sidebar/union-find/union-find.js');
const choice = require('./sidebar/choice/choice.js');
const heap = require('./sidebar/heap/heap.js');
const graph = require('./sidebar/graph/graph.js');
const linkedList = require('./sidebar/linked-list/linked-list.js');
const chat = require('./sidebar/chat/chat.js');

module.exports = {
	"/choice/": choice,
	"/binary-search/": binarySearch,
	"/dynamic-programming/": dynamicProgramming,
	"/union-find/": unionFind,
	"/heap/": heap,
	"/graph/": graph,
	"/linked-list/": linkedList,
	"/chat/": chat,
	"/": index
}