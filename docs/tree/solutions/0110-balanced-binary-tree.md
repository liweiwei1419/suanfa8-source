---
title: 「力扣」第 110 题：平衡二叉树（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
permalink: leetcode-algo/0110-balanced-binary-tree
---

+ 题目描述：[110. 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/description/)。

## 题目描述

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

> 一个二叉树*每个节点* 的左右两个子树的高度差的绝对值不超过 1 。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg)

```
输入：root = [3,9,20,null,null,15,7]
输出：true
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg)



```
输入：root = [1,2,2,3,3,null,null,4,4]
输出：false
```

**示例 3：**

```
输入：root = []
输出：true
```

**提示：**

- 树中的节点数在范围 `[0, 5000]` 内
- `-10^4 <= Node.val <= 10^4`

## 思路分析

判断一棵二叉树是否是平衡二叉树。什么是平衡二叉树：每一个节点的左右子树的高度差不超过 $1$。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

# 给定一个二叉树，判断它是否是高度平衡的二叉树。
# 本题中，一棵高度平衡二叉树定义为：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。


class Solution:
    def isBalanced(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """
        # 先写特殊情况，空树是平衡二叉树
        if root is None:
            return True
        return self.__helper(root) != -1

    def __helper(self, node):
        # 因为必须从底下到上面依次判断，所以使用后序遍历
        if node is None:
            return 0
        left = self.__helper(node.left)
        right = self.__helper(node.right)
        if left == -1 or right == -1 or abs(left - right) > 1:
            return -1
        # 重点，辅助函数的定义是，左右子树的高度中最大的那个
        return max(left, right) + 1
```
