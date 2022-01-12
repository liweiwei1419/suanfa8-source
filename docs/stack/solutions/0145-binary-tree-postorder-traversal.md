---
title: 「力扣」第 145 题：二叉树的后序遍历（困难）
icon: yongyan
category: 栈
tags:
  - 栈
---

- 题目链接：[145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/) 。

## 题目描述

Given the `root` of a binary tree, return the postorder traversal of its nodes' values.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/08/28/pre1.jpg)

```
Input: root = [1,null,2,3]
Output: [3,2,1]
```

**Example 2:**

```
Input: root = []
Output: []
```

**Example 3:**

```
Input: root = [1]
Output: [1]
```

**Constraints:**

- The number of the nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

**参考代码**：

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def postorderTraversal(self, root):
        if not root:
            return []
        stack = [(1, root)]
        res = []
        while stack:
            command, node = stack.pop()
            if command == 0:
                res.append(node.val)
            else:
                # 后序遍历：先左右子树，再自己
                # 入栈顺序：自己、右子树、左子树
                stack.append((0, node))
                if node.right:
                    stack.append((1, node.right))
                if node.left:
                    stack.append((1, node.left))
        return res
```

上面的过程更好地体现了递归过程中系统栈的作用，按照这种方式，所有的递归的代码都可以改造成非递归的代码。
