const reference = require('./reference.js');
const recursionTimeComplexity = require('./recursion-time-complexity.js');
const loopInvariant = require('./loop-invariant.js');
const sortBasic = require('./sort-basic.js');
const mergeSort = require('./merge-sort.js');
const quickSort = require('./quick-sort.js');
const nonComparison = require('./non-comparison.js');
const binarySearch = require('./binary-search.js');
const slidingWindow = require('./sliding-window.js');
const twoPointers = require('./two-pointers.js');
const linkedList = require('./linked-list.js');
const stack = require('./stack.js');
const queue = require('./queue.js');
const heap = require('./heap.js');
const tree = require('./tree.js');
const binarySearchTree = require('./binary-search-tree.js');
const hashTable = require('./hash-table.js');
const backtracking = require('./backtracking.js');
const breadthFirstSearch = require('./breadth-first-search.js');


// const heap = require('./heap.js');
// const heap = require('./heap.js');

// const unionFind = require('./union-find.js');


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
				"children": sortBasic
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
				"children": []
			},
			{
				"title": "第 19 章 贪心算法",
				"icon": "zu11",
				"children": []
			}
		]
	},

	{
		"title": "第 4 部分 高级数据结构",
		"icon": "gaojihuiyuan",
		"children": [
			{
				"title": "第 20 章 并查集（选学）",
				"icon": "merge",
				"children": []// unionFind
			},
			{
				"title": "第 21 章 线段树（选学）",
				"icon": "xianduan",
				"children": []
			},
			{
				"title": "第 22 章 树状数组（选学）",
				"icon": "shuzhuangpailie",
				"children": []
			}
		]
	},

	{
		"title": "第 5 部分 图论",
		"icon": "tuluntuilisuanfa",
		"children": [
			{
				"title": "第 23 章 单源最短路径",
				"icon": "tuluntuilisuanfa",
				"children": []
			},
			{
				"title": "第 24 章 最小生成树",
				"icon": "tuluntuilisuanfa",
				"children": []
			}
		]
	}
]