---
title: 「力扣」第 222 题：求完全二叉树的节点数、满二叉树
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

- 题目链接：[222. 完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)。

## 题目描述

给你一棵 **完全二叉树** 的根节点 `root` ，求出该树的节点个数。

[完全二叉树](https://baike.baidu.com/item/完全二叉树/7773232?fr=aladdin) 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 `h` 层，则该层包含 `1~ 2^h` 个节点。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/14/complete.jpg)

```
输入：root = [1,2,3,4,5,6]
输出：6
```

**示例 2：**

```
输入：root = []
输出：0
```

**示例 3：**

```
输入：root = [1]
输出：1
```

**提示：**

- 树中节点的数目范围是`[0, 5 * 10^4]`
- `0 <= Node.val <= 5 * 10^4`
- 题目数据保证输入的树是 **完全二叉树**

**进阶：**遍历树来统计节点是一种时间复杂度为 `O(n)` 的简单解决方案。你可以设计一个更快的算法吗？

## 思路分析

给定一棵完全二叉树，求完全二叉树的节点的个数。

- 什么是完全二叉树？除了最后一层，所有层的节点数达到最大，与此同时，最后一层的所有节点集中在这一层的左侧。事实上，堆就是使用完全二叉树定义的。

- 什么是满二叉树？所有层的节点数达到了最大。

Python 代码：

```python
# Definition for a binary tree node.

# 222. 完全二叉树的节点个数
# 给出一个完全二叉树，求出该树的节点个数。
# 说明：完全二叉树的定义如下：
# 在完全二叉树中，除了最底层节点可能没填满外，
# 其余每层节点数都达到最大值，
# 并且最下面一层的节点都集中在该层最左边的若干位置。
# 若最底层为第 h 层，则该层包含 1~ 2h 个节点。
# 求完全二叉树的结点数、满二叉树。使用递归可以完成。


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def countNodes(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        left_depth = self.__depth(root, True)
        right_depth = self.__depth(root, False)

        if left_depth == right_depth:
            # return 2 ** left_depth - 1
            return (1 << left_depth) - 1
        if left_depth > right_depth:
            return 1 + self.countNodes(root.left) + self.countNodes(root.right)

    def __depth(self, node, is_left):
        depth = 0
        while node:
            depth += 1
            node = node.left if is_left else node.right
        return depth
```

说明：体会在递归过程中，“减而治之”的策略。

# LeetCode 第 222 题：求完全二叉树的结点数、满二叉树

Python 代码：

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def countNodes(self, root):
        left_depth = self.__depth(root, True)
        right_depth = self.__depth(root, False)

        if left_depth == right_depth:
            # return 2 ** left_depth - 1
            return (1 << left_depth) - 1
        if left_depth > right_depth:
            return 1 + self.countNodes(root.left) + self.countNodes(root.right)

    def __depth(self, node, is_left):
        depth = 0
        while node:
            depth += 1
            node = node.left if is_left else node.right
        return depth
```

### LeetCode 第 222 题：给出一个完全二叉树，求出该树的节点个数（典型递归问题）

提示：如果是满二叉树，结点的个数是有规律可循的。那么是不是满二叉树，可以通过子树的深度来判断。

Python 代码：

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def countNodes(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        left_depth = self.__depth(root, True)
        right_depth = self.__depth(root, False)

        if left_depth == right_depth:
            # return 2 ** left_depth - 1
            return (1 << left_depth) - 1
        if left_depth > right_depth:
            return 1 + self.countNodes(root.left) + self.countNodes(root.right)

    def __depth(self, node, is_left):
        depth = 0
        while node:
            depth += 1
            node = node.left if is_left else node.right
        return depth
```
