---
title: 「力扣」第 404 题：左叶子之和（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

+ 题目链接：[404. 左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/description/)。

## 题目描述

计算给定二叉树的所有左叶子之和。



**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/04/08/leftsum-tree.jpg)



```
Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.
```

**Example 2:**

```
Input: root = [1]
Output: 0
```

**Constraints:**

- The number of nodes in the tree is in the range `[1, 1000]`.
- `-1000 <= Node.val <= 1000`
