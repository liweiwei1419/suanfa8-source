const index = require('./sidebar/index.js');
const binarySearch = require('./sidebar/binary-search/binary-search.js');
const dynamicProgramming = require('./sidebar/dynamic-programming/dynamic-programming.js');
const unionFind = require('./sidebar/union-find/union-find.js');
const choice = require('./sidebar/choice/choice.js');

module.exports = {
	"/choice/": choice,
	"/binary-search/": binarySearch,
	"/dynamic-programming/": dynamicProgramming,
	"/union-find/": unionFind,
	"/": index
}