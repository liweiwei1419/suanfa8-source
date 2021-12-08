const reference = require('./front-page/reference.js');
const recursionTimeComplexity = require('./front-page/recursion-time-complexity.js');
const loopInvariant = require('./front-page/loop-invariant.js');
const basicSort = require('./front-page/basic-sort.js');
const mergeSort = require('./front-page/merge-sort.js');
const quickSort = require('./front-page/quick-sort.js');
const nonComparison = require('./front-page/non-comparison.js');
const binarySearch = require('./front-page/binary-search.js');
const slidingWindow = require('./front-page/sliding-window.js');
const twoPointers = require('./front-page/two-pointers.js');
const linkedList = require('./front-page/linked-list.js');
const stack = require('./front-page/stack.js');
const queue = require('./front-page/queue.js');
const heap = require('./front-page/heap.js');
const tree = require('./front-page/tree.js');
const binarySearchTree = require('./front-page/binary-search-tree.js');
const hashTable = require('./front-page/hash-table.js');
const backtracking = require('./front-page/backtracking.js');
const breadthFirstSearch = require('./front-page/breadth-first-search.js');
const dynamicProgramming = require('./front-page/dynamic-programming.js');
const greedy = require('./front-page/greedy.js');
const unionFind = require('./front-page/union-find.js');
const trie = require('./front-page/trie.js');
const segmentTree = require('./front-page/segment-tree.js');
const fenwickTree = require('./front-page/fenwick-tree.js');
const dijkstra = require('./front-page/dijkstra.js');
const minimumSpanningTree = require('./front-page/minimum-spanning-tree.js');

module.exports = [
	{
		"title":"第 1 部分 算法基础",
		"icon": "suanfa",
		"children": [
			{
				"title": "第 0 章 参考资料",
				"icon": "ziliaoku",
				"children": reference
			},
			{
				"title": "第 1 章 递归与时间复杂度",
				"icon": "shijian1",
				"children": recursionTimeComplexity
			},
			{
				"title": "第 2 章 循环不变量",
				"icon": "process",
				"children": loopInvariant
			},
			{
				"title": "第 3 章 基础排序算法",
				"icon": "paixu",
				"children": basicSort
			},
			{

				"title": "第 4 章 归并排序",
				"icon": "huiguijueceshu",
				"children": mergeSort
			},
			{
				"title": "第 5 章 快速排序",
				"icon": "fenleijueceshu",
				"children": quickSort
			},
			{

				"title": "第 6 章 非比较排序算法",
				"icon": "fl-tong",
				"children": nonComparison
			},

			{
				"title": "第 7 章 二分查找",
				"icon": "chaxun",
				"children": binarySearch
			},
			{
				"title": "第 8 章 滑动窗口",
				"icon": "yemiantuiguang",
				"children": slidingWindow
			},
			{
				"title": "第 9 章 双指针",
				"icon": "xuanzezhizhen",
				"children": twoPointers
			}
		]
	},
	{
		"title": "第 2 部分 数据结构基础",
		"icon": "shujujiegou",
		"children": [
			{
				"title": "第 10 章 链表",
				"icon": "lianjie",
				"children": linkedList
			},
			{
				"title": "第 11 章 栈",
				"icon": "line-stackduizhan",
				"children": stack
			},
			{
				"title": "第 12 章 队列",
				"icon": "mqxiaoxiduilieMQ",
				"children": queue
			},
			{
				"title": "第 13 章 优先队列",
				"icon": "mqxiaoxiduilieMQ",
				"children": heap
			},
			{
				"title": "第 14 章 二叉树",
				"icon": "mqxiaoxiduilieMQ",
				"children": tree
			},
			{
				"title": "第 15 章 二叉搜索树",
				"icon": "shuzhuangtu",
				"children": binarySearchTree
			},
			{
				"title": "第 16 章 哈希表",
				"icon": "haxi",
				"children": hashTable
			},
		]
	},

	{
		"title": "第 3 部分 算法思想",
		"icon": "jiyinsuanfa",
		"children": [
			{
				"title": "第 17 章 回溯算法",
				"icon": "huisuzonglan",
				"children": backtracking
			},
			{
				"title": "第 18 章 广度优先遍历",
				"icon": "shenduheguangdu",
				"children": breadthFirstSearch
			},
			{
				"title": "第 19 章 动态规划",
				"icon": "biaoge",
				"children": dynamicProgramming
			},
			{
				"title": "第 20 章 贪心算法",
				"icon": "zu11",
				"children": greedy
			}
		]
	},

	{
		"title": "第 4 部分 高级数据结构",
		"icon": "gaojihuiyuan",
		"children": [
			{
				"title": "第 21 章  字典树",
				"icon": "merge",
				"children": trie
			},
			{
				"title": "第 22 章 并查集（选学）",
				"icon": "merge",
				"children": unionFind
			},
			{
				"title": "第 23 章 线段树（选学）",
				"icon": "xianduan",
				"children": segmentTree
			},
			{
				"title": "第 24 章 树状数组（选学）",
				"icon": "shuzhuangpailie",
				"children": fenwickTree
			}
		]
	},

	{
		"title": "第 5 部分 图论",
		"icon": "tuluntuilisuanfa",
		"children": [
			{
				"title": "第 25 章 单源最短路径",
				"icon": "tuluntuilisuanfa",
				"children": dijkstra
			},
			{
				"title": "第 26 章 最小生成树",
				"icon": "tuluntuilisuanfa",
				"children": minimumSpanningTree
			}
		]
	}
]