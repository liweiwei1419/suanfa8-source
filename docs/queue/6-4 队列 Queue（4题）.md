## 6-4 队列 Queue（4题）



### 例题1：LeetCode 第 102 题（常规题）

题目要求：102 题和 107 题都要求完成二叉树的层序遍历。

给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。

题目难度：中等。

中文网址：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/

求解关键：非常标准的层序遍历的做法，使用队列作为辅助的数据结构。

 

### 练习1：LeetCode 第 107 题（常规题）

题目要求：给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）。

题目难度：简单。

中文网址：https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/description/

 

### 练习2：LeetCode 第 103 题103. 二叉树的锯齿形层次遍历

题目要求：给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

题目难度：简单。

中文网址：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/

```java
if (direction) {
    curList.add(curNode.val);
} else {
    curList.add(0, curNode.val);
}
```

【看看别人是怎么做的，我感觉我做的有点麻烦。】

### 练习3：LeetCode 第 199 题：199. 二叉树的右视图

题目要求：二叉树从右边看，得到的一个数组。给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

1、深度优先遍历；

2、层序遍历（2种写法，本质上其实一样）